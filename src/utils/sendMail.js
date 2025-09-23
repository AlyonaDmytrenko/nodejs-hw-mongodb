import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export function sendMail(mail){

    mail.from = "dmytrenkoalyona@gmail.com";
    return transporter.sendMail(mail);
}