const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailSender {
  transport;
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_Email,
        pass: process.env.MY_Email_Pass,
      },
    });
  }

  async sendMessage(from,to, subject, html) {
    let mailOptions = {
      from,
      to,
      subject,
      html,
    };

    await this.transport.sendMail(mailOptions);
  }

}



module.exports = new EmailSender() ;