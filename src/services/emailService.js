const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = (to, subject, templateName) => {
    const templatePath = path.join(__dirname, '..', 'emails', `${templateName}.html`);
    const template = fs.readFileSync(templatePath, 'utf8');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: template
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email enviado: ' + info.response);
    });
};

module.exports = {
    sendEmail
};
