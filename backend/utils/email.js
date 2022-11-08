const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

exports.mailTo = async (email, text, html, subject,request) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
      html
    });
    console.log(info.messageId);
    console.log("Testing email functionality");
    return {
      message: "Email sent successfully",
      emailId: info.messageId,
      status: true
    };
  } catch (error) {
    console.log(error);
    return { message: "Unable to send email", status: false };
  }
};
