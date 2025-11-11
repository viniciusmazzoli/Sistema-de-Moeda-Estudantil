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
    "[mailService] Variáveis de SMTP não configuradas. Emails não serão enviados."
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
    // necessário no seu ambiente por causa do "self-signed certificate"
    rejectUnauthorized: false,
  },
});

export async function sendMail(to: string, subject: string, html: string) {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.log("[mailService] Ignorando envio de email (SMTP não configurado).");
    return;
  }

  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });
}

// ---------- 1) Email: aluno recebeu moedas ----------

export async function sendStudentReceivedCoinsEmail(params: {
  alunoNome: string;
  alunoEmail: string;
  professorNome: string;
  amount: number;
  reason: string;
}) {
  const { alunoNome, alunoEmail, professorNome, amount, reason } = params;

  const subject = `Você recebeu ${amount} moedas do professor ${professorNome}`;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827;">
      <h2>Você recebeu novas moedas! 🎓</h2>
      <p>Olá, <strong>${alunoNome}</strong>!</p>
      <p>Você acabou de receber <strong>${amount} moedas</strong> do professor <strong>${professorNome}</strong>.</p>
      <p><strong>Motivo:</strong> ${reason}</p>
      <p>Acesse o sistema para acompanhar seu saldo e resgatar vantagens.</p>
      <br/>
      <p style="font-size: 12px; color: #6b7280;">
        Sistema de Mérito Estudantil – este é um e-mail automático.
      </p>
    </div>
  `;

  await sendMail(alunoEmail, subject, html);
}

// ---------- 2) Email: confirmação para o professor ----------

export async function sendProfessorConfirmationEmail(params: {
  professorNome: string;
  professorEmail: string;
  alunoNome: string;
  amount: number;
  reason: string;
  novoSaldo: number;
}) {
  const {
    professorNome,
    professorEmail,
    alunoNome,
    amount,
    reason,
    novoSaldo,
  } = params;

  const subject = `Confirmação de envio de ${amount} moedas`;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827;">
      <h2>Envio de Moedas Confirmado 💰</h2>
      <p>Olá, <strong>${professorNome}</strong>,</p>
      <p>Você enviou <strong>${amount}</strong> moedas para o aluno <strong>${alunoNome}</strong>.</p>
      <p><strong>Motivo:</strong> ${reason}</p>
      <p>Seu novo saldo é de <strong>${novoSaldo}</strong> moedas.</p>
      <br/>
      <p style="font-size: 12px; color: #6b7280;">
        Sistema de Mérito Estudantil – este é um e-mail automático.
      </p>
    </div>
  `;

  await sendMail(professorEmail, subject, html);
}

// ---------- 3) Email: resgate de vantagem (aluno + parceiro) ----------

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

  // Email para o aluno
  const subjectAluno = `Cupom gerado: ${rewardTitle}`;
  const htmlAluno = `
    <div style="font-family: Arial, sans-serif; color: #111827;">
      <h2>Seu cupom está pronto! 🎁</h2>
      <p>Olá, <strong>${alunoNome}</strong>!</p>
      <p>Seu resgate da vantagem <strong>${rewardTitle}</strong> foi concluído com sucesso.</p>
      <p>Apresente o seguinte código no parceiro:</p>
      <h2 style="letter-spacing: 3px;">${couponCode}</h2>
      <p>Guarde este código com cuidado. Ele será usado para conferência na hora da troca.</p>
      <br/>
      <p style="font-size: 12px; color: #6b7280;">
        Sistema de Mérito Estudantil – este é um e-mail automático.
      </p>
    </div>
  `;

  // Email para o parceiro
  const subjectParceiro = `Novo cupom gerado para ${rewardTitle}`;
  const htmlParceiro = `
    <div style="font-family: Arial, sans-serif; color: #111827;">
      <h2>Novo cupom resgatado 🎫</h2>
      <p>Olá, <strong>${partnerNome}</strong>!</p>
      <p>Um aluno resgatou a vantagem <strong>${rewardTitle}</strong> do seu estabelecimento.</p>
      <p><strong>Aluno:</strong> ${alunoNome}</p>
      <p><strong>Código do cupom:</strong></p>
      <h2 style="letter-spacing: 3px;">${couponCode}</h2>
      <p>Use este código para conferir a troca no momento do atendimento.</p>
      <br/>
      <p style="font-size: 12px; color: #6b7280;">
        Sistema de Mérito Estudantil – este é um e-mail automático.
      </p>
    </div>
  `;

  await sendMail(alunoEmail, subjectAluno, htmlAluno);
  await sendMail(partnerEmail, subjectParceiro, htmlParceiro);
}
