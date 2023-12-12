"use client";
const nodemailer = require("nodemailer");

async function sendMail(email, verify, template) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ls.computer1998@gmail.com",
      pass: "nixm aqrr pghf zdvr",
    },
  });

  const info = await transporter.sendMail({
    from: "ls.computer1998@gmail.com", // sender address
    to: email, // list of receivers
    subject: "verify your email", // Subject line
    html: template(verify), // html body
  });
}

module.exports = sendMail;
