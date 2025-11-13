// src/services/mailService.ts
import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
  console.warn(
    "[mailService] Variáveis SMTP ausentes — e-mails não serão enviados."
  );
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: false, // 587 = STARTTLS
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * Layout base premium para todos os e-mails
 */
function baseTemplate({
  title,
  intro,
  content,
  footerNote,
}: {
  title: string;
  intro?: string;
  content: string;
  footerNote?: string;
}) {
  return `
  <div style="background-color:#f4f5fb;padding:24px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.12);">
      <tr>
        <td style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:16px 24px;color:#f9fafb;">
          <h1 style="margin:0;font-size:20px;font-weight:600;">
            Sistema de Mérito Estudantil
          </h1>
          <p style="margin:4px 0 0;font-size:13px;opacity:0.9;">
            Reconhecendo esforço, premiando resultados.
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:24px 24px 8px;">
          <h2 style="margin:0 0 8px;font-size:18px;color:#111827;">
            ${title}
          </h2>
          ${
            intro
              ? `<p style="margin:0 0 16px;font-size:14px;color:#4b5563;">${intro}</p>`
              : ""
          }
          <div style="font-size:14px;color:#111827;line-height:1.6;">
            ${content}
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding:16px 24px 20px;">
          <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">
            Atenciosamente,<br/>
            <strong>Equipe Sistema de Mérito Estudantil</strong>
          </p>
          <p style="margin:8px 0 0;font-size:11px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:8px;">
            ${
              footerNote ||
              "Este é um e-mail automático. Por favor, não responda diretamente a esta mensagem."
            }
          </p>
        </td>
      </tr>
    </table>
  </div>
  `;
}

export async function sendMail(to: string, subject: string, html: string) {
  if (!SMTP_FROM || !SMTP_USER) {
    console.log("[mailService] Envio ignorado (SMTP não configurado).");
    return;
  }

  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });
}

// ======================================================================
// 1️⃣ Email — aluno recebeu moedas do professor
// ======================================================================
export async function sendStudentReceivedCoinsEmail(params: {
  alunoNome: string;
  alunoEmail: string;
  professorNome: string;
  amount: number;
  reason: string;
}) {
  const { alunoNome, alunoEmail, professorNome, amount, reason } = params;

  const subject = `Você recebeu ${amount} moedas de ${professorNome}`;
  const html = baseTemplate({
    title: "Você recebeu novas moedas! 🎓",
    intro: `Olá, <strong>${alunoNome}</strong>!`,
    content: `
      <p style="margin:0 0 12px;">
        Você acabou de receber <strong>${amount} moedas</strong> do professor
        <strong>${professorNome}</strong>.
      </p>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:12px 14px;margin-bottom:12px;">
        <p style="margin:0;font-size:13px;color:#4b5563;">
          <strong>Motivo do reconhecimento:</strong><br/>
          ${reason}
        </p>
      </div>
      <p style="margin:0;">
        Acesse o painel do aluno para acompanhar seu saldo de moedas e
        resgatar vantagens com empresas parceiras.
      </p>
    `,
  });

  await sendMail(alunoEmail, subject, html);
}

// ======================================================================
// 2️⃣ Email — confirmação para o professor
// ======================================================================
export async function sendProfessorConfirmationEmail(params: {
  professorNome: string;
  professorEmail: string;
  alunoNome: string;
  amount: number;
  reason: string;
  novoSaldo: number;
}) {
  const { professorNome, professorEmail, alunoNome, amount, reason, novoSaldo } =
    params;

  const subject = `Confirmação do envio de ${amount} moedas`;
  const html = baseTemplate({
    title: "Envio de moedas confirmado 💰",
    intro: `Olá, <strong>${professorNome}</strong>!`,
    content: `
      <p style="margin:0 0 12px;">
        Registramos o envio de <strong>${amount} moedas</strong> para o aluno
        <strong>${alunoNome}</strong>.
      </p>

      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:12px;">
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Aluno</td>
          <td style="font-size:13px;color:#111827;font-weight:600;text-align:right;">${alunoNome}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Moedas enviadas</td>
          <td style="font-size:13px;color:#111827;font-weight:600;text-align:right;">${amount}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Seu novo saldo</td>
          <td style="font-size:13px;color:#16a34a;font-weight:700;text-align:right;">${novoSaldo}</td>
        </tr>
      </table>

      <div style="background:#ecfdf5;border-radius:10px;padding:10px 12px;border:1px solid #bbf7d0;margin-bottom:8px;">
        <p style="margin:0;font-size:13px;color:#14532d;">
          <strong>Motivo informado:</strong><br/>
          ${reason}
        </p>
      </div>

      <p style="margin:0;font-size:13px;color:#4b5563;">
        Continue utilizando as moedas para reconhecer participação, dedicação
        e engajamento dos seus alunos.
      </p>
    `,
  });

  await sendMail(professorEmail, subject, html);
}

// ======================================================================
// 3️⃣ Email — resgate de vantagem (aluno + parceiro)
// ======================================================================
export async function sendRewardRedemptionEmails(params: {
  alunoNome: string;
  alunoEmail: string;
  partnerNome: string;
  partnerEmail: string;
  rewardTitle: string;
  couponCode: string;
}) {
  const {
    alunoNome,
    alunoEmail,
    partnerNome,
    partnerEmail,
    rewardTitle,
    couponCode,
  } = params;

  // Aluno
  const subjectAluno = `Cupom gerado: ${rewardTitle}`;
  const htmlAluno = baseTemplate({
    title: "Seu cupom está pronto! 🎁",
    intro: `Olá, <strong>${alunoNome}</strong>!`,
    content: `
      <p style="margin:0 0 12px;">
        Você acabou de resgatar a vantagem <strong>${rewardTitle}</strong>.
      </p>

      <div style="background:#111827;color:#f9fafb;border-radius:12px;padding:14px 16px;text-align:center;margin-bottom:12px;">
        <p style="margin:0 0 4px;font-size:13px;opacity:0.9;">Código do seu cupom</p>
        <p style="margin:0;font-size:24px;font-weight:700;letter-spacing:4px;">
          ${couponCode}
        </p>
      </div>

      <p style="margin:0 0 4px;font-size:13px;color:#4b5563;">
        <strong>Parceiro:</strong> ${partnerNome}
      </p>

      <p style="margin:8px 0 0;font-size:13px;color:#4b5563;">
        Apresente este código na hora da utilização do benefício para que o parceiro
        possa validar o cupom.
      </p>
    `,
  });

  // Parceiro
  const subjectParceiro = `Novo cupom resgatado: ${rewardTitle}`;
  const htmlParceiro = baseTemplate({
    title: "Novo cupom resgatado 🎫",
    intro: `Olá, <strong>${partnerNome}</strong>!`,
    content: `
      <p style="margin:0 0 12px;">
        Um aluno resgatou uma vantagem do seu estabelecimento no Sistema de Mérito Estudantil.
      </p>

      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:12px;">
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Aluno</td>
          <td style="font-size:13px;color:#111827;font-weight:600;text-align:right;">${alunoNome}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Vantagem</td>
          <td style="font-size:13px;color:#111827;font-weight:600;text-align:right;">${rewardTitle}</td>
        </tr>
      </table>

      <div style="background:#0f172a;color:#f9fafb;border-radius:12px;padding:14px 16px;text-align:center;margin-bottom:10px;">
        <p style="margin:0 0 4px;font-size:13px;opacity:0.9;">Código a ser validado</p>
        <p style="margin:0;font-size:22px;font-weight:700;letter-spacing:4px;">
          ${couponCode}
        </p>
      </div>

      <p style="margin:0;font-size:13px;color:#4b5563;">
        No momento do atendimento, confira o código informado pelo aluno e utilize
        a área de parceiro no sistema para marcar o cupom como <strong>UTILIZADO</strong>.
      </p>
    `,
  });

  await sendMail(alunoEmail, subjectAluno, htmlAluno);
  await sendMail(partnerEmail, subjectParceiro, htmlParceiro);
}

// ======================================================================
// 4️⃣ Email — cupom utilizado (aluno + parceiro)
// ======================================================================
export async function sendRewardUsedEmails(params: {
  alunoNome: string;
  alunoEmail: string;
  partnerNome: string;
  partnerEmail: string;
  rewardTitle: string;
  couponCode: string;
  usedAt?: Date;
}) {
  const {
    alunoNome,
    alunoEmail,
    partnerNome,
    partnerEmail,
    rewardTitle,
    couponCode,
    usedAt = new Date(),
  } = params;

  const dataStr = usedAt.toLocaleString("pt-BR");

  const subjectAluno = `Cupom utilizado: ${rewardTitle}`;
  const htmlAluno = baseTemplate({
    title: "Seu cupom foi utilizado ✅",
    intro: `Olá, <strong>${alunoNome}</strong>!`,
    content: `
      <p style="margin:0 0 12px;">
        Registramos que o seu cupom da vantagem <strong>${rewardTitle}</strong> foi utilizado.
      </p>

      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:12px;">
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Parceiro</td>
          <td style="font-size:13px;color:#111827;font-weight:600;text-align:right;">${partnerNome}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Código</td>
          <td style="font-size:13px;color:#111827;font-weight:600;text-align:right;">${couponCode}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Data de uso</td>
          <td style="font-size:13px;color:#111827;font-weight:600;text-align:right;">${dataStr}</td>
        </tr>
      </table>

      <p style="margin:0;font-size:13px;color:#4b5563;">
        Esperamos que você tenha uma ótima experiência com a vantagem resgatada. ✨
      </p>
    `,
  });

  const subjectParceiro = `Cupom validado: ${rewardTitle}`;
  const htmlParceiro = baseTemplate({
    title: "Cupom validado com sucesso 🧾",
    intro: `Olá, <strong>${partnerNome}</strong>!`,
    content: `
      <p style="margin:0 0 12px;">
        Um cupom foi marcado como <strong>UTILIZADO</strong> no seu estabelecimento.
      </p>

      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:12px;">
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Aluno</td>
          <td style="font-size:13px;color:#111827;font-weight:600;text-align:right;">${alunoNome}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Vantagem</td>
          <td style="font-size:13px;color:#111827;font-weight:600;text-align:right;">${rewardTitle}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Código</td>
          <td style="font-size:13px;color:#111827;font-weight:600;text-align:right;">${couponCode}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#6b7280;padding:6px 0;">Data de validação</td>
          <td style="font-size:13px;color:#111827;font-weight:600;text-align:right;">${dataStr}</td>
        </tr>
      </table>

      <p style="margin:0;font-size:13px;color:#4b5563;">
        Guarde este e-mail como registro da utilização do benefício.
      </p>
    `,
  });

  await Promise.all([
    sendMail(alunoEmail, subjectAluno, htmlAluno),
    sendMail(partnerEmail, subjectParceiro, htmlParceiro),
  ]);
}
