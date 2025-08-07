import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "",
    port: "",
    secure: false,
       auth: {
        user: "",
        pass: "",
       }
});

export function sendMail(mail){

    mail.from = "svoy email";
    return transporter.sendMail(mail);
}