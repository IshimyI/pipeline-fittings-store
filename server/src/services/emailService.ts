import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2",
  },
});

interface SendEmailArgs {
  to: string;
  subject: string;
  text: string;
}

// `to` is accepted but not actually used below (mail always goes to
// ADMIN_EMAIL) — that's how the original JS behaved too; every call site
// already passes ADMIN_EMAIL as `to`, so this is dead-but-harmless, not a
// live bug. Kept as-is rather than silently changing the send target.
const sendEmail = async ({ to, subject, text }: SendEmailArgs) => {
  void to;
  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject,
      text,
    });
    console.log("Письмо успешно отправлено");
    return result;
  } catch (error) {
    console.error("Ошибка при отправке письма:", error);
    throw error;
  }
};

export default sendEmail;
