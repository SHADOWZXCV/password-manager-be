const nodemailer = require("nodemailer");
const logger = require("./log");

const sendBulkEmail = async (emails, mailData) => {
    if (!mailData)
        return false;

    const mailInfo = {
        from: process.env.emailForEservices,
        to: emails,
        ...mailData,
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.emailForEservices,
            pass: process.env.googleEmailPass
        }
    });

    transporter.sendMail(mailInfo, (err, data) => {
        if(err)
            return logger.error("Can't send email: " + err);
        return logger.info("Email is sent: " + JSON.stringify(data));
    });
};

module.exports = {
    sendBulkEmail
}