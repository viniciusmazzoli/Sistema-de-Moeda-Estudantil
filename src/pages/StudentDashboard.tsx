// src/pages/StudentDashboard.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";

interface Reward {
  id: number;
  title: string;
  description: string;
  cost: number;
  imageUrl?: string | null;
  active: boolean;
  createdAt: string;
}

interface ExtratoItem {
  id: number;
  tipo: "recebido" | "resgatado";
  descricao: string;
  valor: number;
  data: string;
  cupom?: string;
}

export default function StudentDashboard() {
  const { user } = useAuth(); // HOOK 1

  // HOOKS sempre aqui em cima
  const [saldo, setSaldo] = useState<number | null>(null);
  const [extrato, setExtrato] = useState<ExtratoItem[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [carregandoDados, setCarregandoDados] = useState(true);
  const [carregandoResgateId, setCarregandoResgateId] = useState<number | null>(
    null
  );

  const alunoBackendId = user?.backendId;

  // Carrega saldo, extrato e vantagens
  useEffect(() => {
    if (!alunoBackendId) return;

    const carregar = async () => {
      try {
        setCarregandoDados(true);

        // 1) saldo + transações
        const respResumo = await fetch(
          `http://localhost:3333/accounts/${alunoBackendId}/summary`
        );
        const resumo = await respResumo.json();

        setSaldo(resumo.account.balance);

        const itens: ExtratoItem[] = [];

        // Recebidas (professor -> aluno)
        (resumo.received || []).forEach((t: any) => {
          itens.push({
            id: t.id,
            tipo: "recebido",
            descricao: t.description,
            valor: t.amount,
            data: new Date(t.createdAt).toLocaleString("pt-BR"),
          });
        });

        // Resgates (aluno gastando moedas em vantagens)
        (resumo.sent || [])
          .filter((t: any) => t.type === "RESGATE_VANTAGEM")
          .forEach((t: any) => {
            itens.push({
              id: t.id,
              tipo: "resgatado",
              descricao: t.description,
              valor: t.amount,
              data: new Date(t.createdAt).toLocaleString("pt-BR"),
              cupom: t.couponCode || undefined,
            });
          });

        // Ordena por data desc
        itens.sort(
          (a, b) =>
            new Date(b.data).getTime() - new Date(a.data).getTime()
        );
        setExtrato(itens);

        // 2) vantagens disponíveis
        const respRewards = await fetch("http://localhost:3333/rewards");
        const listaRewards = await respRewards.json();
        setRewards(listaRewards);
      } catch (err) {
        console.error("Erro ao carregar dados do aluno:", err);
      } finally {
        setCarregandoDados(false);
      }
    };

    carregar();
  }, [alunoBackendId]);

  // Proteção de rota
  if (!user || user.role !== "aluno") {
    return <Navigate to="/" replace />;
  }

  if (!alunoBackendId) {
    return (
      <Layout title="Área do Aluno">
        <p>
          Usuário aluno não está vinculado corretamente ao backend (sem{" "}
          <code>backendId</code>).
        </p>
      </Layout>
    );
  }

  const podeResgatar = (reward: Reward) =>
    saldo !== null && saldo >= reward.cost;

  const handleResgatar = async (reward: Reward) => {
    if (!podeResgatar(reward)) {
      alert("Saldo insuficiente para resgatar esta vantagem.");
      return;
    }

    try {
      setCarregandoResgateId(reward.id);

      const resp = await fetch("http://localhost:3333/rewards/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: alunoBackendId,
          rewardId: reward.id,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        console.error(data);
        alert(data.error || "Erro ao resgatar vantagem.");
        return;
      }

      // Atualiza saldo
      if (data.updatedAccount) {
        setSaldo(data.updatedAccount.balance);
      }

      // Adiciona linha no extrato
      if (data.transaction) {
        setExtrato((prev) => [
          {
            id: data.transaction.id,
            tipo: "resgatado",
            descricao: data.transaction.description,
            valor: data.transaction.amount,
            data: new Date(
              data.transaction.createdAt
            ).toLocaleString("pt-BR"),
            cupom: data.transaction.couponCode || data.couponCode || undefined,
          },
          ...prev,
        ]);
      }

      // Mostra código de cupom retornado
      if (data.couponCode) {
        alert(
          `Vantagem resgatada com sucesso!\n\nCódigo do cupom: ${data.couponCode}`
        );
      } else {
        alert("Vantagem resgatada com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao resgatar vantagem:", err);
      alert("Erro inesperado ao resgatar vantagem.");
    } finally {
      setCarregandoResgateId(null);
    }
  };

  return (
    <Layout title={`Área do Aluno – ${user.nome}`}>
      <div className="grid-2">
        <Card title="Seu saldo de moedas">
          <p className="saldo-valor">
            {saldo !== null ? `${saldo} moedas` : "Carregando..."}
          </p>
          <p className="texto-suave">
            Você recebe moedas dos seus professores como forma de
            reconhecimento. Use-as para resgatar vantagens especiais.
          </p>
        </Card>

        <Card title="Vantagens disponíveis">
          {carregandoDados ? (
            <p className="texto-suave">Carregando vantagens...</p>
          ) : rewards.length === 0 ? (
            <p className="texto-suave">
              Nenhuma vantagem cadastrada ainda. Tente novamente mais tarde.
            </p>
          ) : (
            <div className="vantagens-grid">
              {rewards.map((r) => (
                <div key={r.id} className="vantagem-card">
                  <strong>{r.title}</strong>
                  <p className="texto-suave" style={{ marginTop: 4 }}>
                    {r.description}
                  </p>
                  <p className="vantagem-custo">
                    Custo: {r.cost} moedas
                  </p>

                  <button
                    className="primary-button"
                    style={{ marginTop: 8, width: "100%" }}
                    disabled={
                      carregandoResgateId === r.id || !podeResgatar(r)
                    }
                    onClick={() => handleResgatar(r)}
                  >
                    {carregandoResgateId === r.id
                      ? "Resgatando..."
                      : podeResgatar(r)
                      ? "Resgatar"
                      : "Saldo insuficiente"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="Histórico de movimentações">
        {extrato.length === 0 ? (
          <p className="texto-suave">
            Você ainda não recebeu moedas nem resgatou vantagens.
          </p>
        ) : (
          <table className="tabela">
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {extrato.map((item) => (
                <tr key={item.id}>
                  <td>{item.data}</td>
                  <td>
                    {item.tipo === "recebido" ? "Recebido" : "Resgate"}
                  </td>
                  <td>
                    {item.descricao}
                    {item.cupom && (
                      <span className="texto-suave">
                        {" "}
                        – Cupom: <strong>{item.cupom}</strong>
                      </span>
                    )}
                  </td>
                  <td
                    className={
                      item.tipo === "recebido"
                        ? "valor-positivo"
                        : "valor-negativo"
                    }
                  >
                    {item.tipo === "recebido" ? "+" : "-"}
                    {item.valor} moedas
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </Layout>
  );
}
