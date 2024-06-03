/* eslint-disable no-undef */
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

const transporter = await nodemailer.createTransport({
    // config mail server
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
    },
});
const senMail = async (email, text, subject, callback) => {
    const mainOptions = {
        from: 'haiminh.work@gmail.com',
        to: email,
        subject: subject,
        html: text,
    };

    await transporter.sendMail(mainOptions, callback);
};

export default senMail;
