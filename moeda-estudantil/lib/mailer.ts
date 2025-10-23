
import nodemailer from "nodemailer";
export async function sendMail(to: string, subject: string, html: string) {
  const host = process.env.SMTP_HOST, user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const from = process.env.SMTP_FROM || "Moeda Estudantil <no-reply@example.com>";
  if (!host || !user || !pass) { console.log("[DEV EMAIL]", { to, subject, html }); return; }
  const transporter = nodemailer.createTransport({ host, port, auth: { user, pass } });
  await transporter.sendMail({ from, to, subject, html });
}
