import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_PORT, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export function sendMail(mail) {
  mail.from = "dmytrenkoalyona@gmail.com";
  return transporter.sendMail(mail);
}
