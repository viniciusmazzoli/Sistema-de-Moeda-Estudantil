// src/pages/ProfessorDashboard.tsx
import { FormEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";

interface BackendUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Envio {
  id: number;
  alunoNome: string;
  motivo: string;
  valor: number;
  data: string;
}

export default function ProfessorDashboard() {
  const { user } = useAuth(); // HOOK 1

  // TODOS os hooks aqui em cima
  const [saldo, setSaldo] = useState<number | null>(null);
  const [alunos, setAlunos] = useState<BackendUser[]>([]);
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [alunoSelecionadoId, setAlunoSelecionadoId] = useState<number | "">(
    ""
  );
  const [motivo, setMotivo] = useState("");
  const [valor, setValor] = useState(10);
  const [carregando, setCarregando] = useState(false);

  const professorBackendId = user?.backendId;

  useEffect(() => {
    if (!professorBackendId) return;

    const carregar = async () => {
      try {
        // saldo + extrato
        const respResumo = await fetch(
          `http://localhost:3333/accounts/${professorBackendId}/summary`
        );
        const resumo = await respResumo.json();
        setSaldo(resumo.account.balance);

        // lista de alunos
        const respUsers = await fetch("http://localhost:3333/users");
        const users: BackendUser[] = await respUsers.json();
        setAlunos(users.filter((u) => u.role === "ALUNO"));

        // envios feitos
        const enviados = (resumo.sent || [])
          .filter((t: any) => t.type === "ENVIO_PROFESSOR_ALUNO")
          .map((t: any) => ({
            id: t.id,
            alunoNome: t.toAccount?.user?.name ?? "Aluno",
            motivo: t.description,
            valor: t.amount,
            data: new Date(t.createdAt).toLocaleString("pt-BR"),
          }));

        setEnvios(enviados);
      } catch (err) {
        console.error("Erro ao carregar dados do professor:", err);
      }
    };

    carregar();
  }, [professorBackendId]);

  // 🔐 proteção de rota: só entra se for professor
  if (!user || user.role !== "professor") {
    return <Navigate to="/" replace />;
  }

  if (!professorBackendId) {
    return (
      <Layout title="Área do Professor">
        <p>
          Este usuário professor não está vinculado corretamente ao backend
          (sem <code>backendId</code>).
        </p>
      </Layout>
    );
  }

  const handleEnviarMoedas = async (e: FormEvent) => {
    e.preventDefault();

    if (!alunoSelecionadoId) {
      alert("Selecione um aluno para enviar moedas.");
      return;
    }

    if (valor <= 0) {
      alert("O valor deve ser maior que zero.");
      return;
    }

    try {
      setCarregando(true);

      const resp = await fetch(
        "http://localhost:3333/transactions/transfer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            professorId: professorBackendId,
            alunoId: alunoSelecionadoId,
            amount: valor,
            reason: motivo || "Reconhecimento de mérito",
          }),
        }
      );

      const data = await resp.json();

      if (!resp.ok) {
        console.error(data);
        alert(data.error || "Erro ao enviar moedas.");
        return;
      }

      setSaldo(data.updatedProfessorAcc.balance);

      setEnvios((prev) => [
        {
          id: data.transaction.id,
          alunoNome:
            alunos.find((a) => a.id === alunoSelecionadoId)?.name || "Aluno",
          motivo: data.transaction.description,
          valor: data.transaction.amount,
          data: new Date(data.transaction.createdAt).toLocaleString("pt-BR"),
        },
        ...prev,
      ]);

      setMotivo("");
      setValor(10);
      setAlunoSelecionadoId("");
      alert("Moedas enviadas com sucesso!");
    } catch (err) {
      console.error("Erro ao enviar moedas:", err);
      alert("Erro inesperado ao enviar moedas.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Layout title={`Área do Professor – ${user.nome}`}>
      <div className="grid-2">
        <Card title="Seu saldo de moedas">
          <p className="saldo-valor">
            {saldo !== null ? `${saldo} moedas` : "Carregando..."}
          </p>
          <p className="texto-suave">
            Você recebe moedas a cada semestre para reconhecer seus alunos.
          </p>
        </Card>

        <Card title="Enviar moedas para aluno">
          <form className="form-grid" onSubmit={handleEnviarMoedas}>
            <label className="full-row">
              Aluno
              <select
                value={alunoSelecionadoId}
                onChange={(e) =>
                  setAlunoSelecionadoId(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
              >
                <option value="">Selecione um aluno</option>
                {alunos.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.email})
                  </option>
                ))}
              </select>
            </label>

            <label>
              Valor (moedas)
              <input
                type="number"
                min={1}
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
              />
            </label>

            <label className="full-row">
              Motivo
              <input
                type="text"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ex: Participação em sala"
              />
            </label>

            <div className="full-row">
              <button
                type="submit"
                className="primary-button"
                disabled={carregando}
              >
                {carregando ? "Enviando..." : "Enviar moedas"}
              </button>
            </div>
          </form>
        </Card>
      </div>

      <Card title="Histórico de envios">
        {envios.length === 0 ? (
          <p className="texto-suave">
            Você ainda não enviou moedas para seus alunos.
          </p>
        ) : (
          <table className="tabela">
            <thead>
              <tr>
                <th>Data</th>
                <th>Aluno</th>
                <th>Motivo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {envios.map((envio) => (
                <tr key={envio.id}>
                  <td>{envio.data}</td>
                  <td>{envio.alunoNome}</td>
                  <td>{envio.motivo}</td>
                  <td className="valor-negativo">-{envio.valor} moedas</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </Layout>
  );
}
