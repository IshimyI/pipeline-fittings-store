const nodemailer = require("nodemailer");

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

const sendEmail = async ({ to, subject, text }) => {
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
module.exports = sendEmail;
