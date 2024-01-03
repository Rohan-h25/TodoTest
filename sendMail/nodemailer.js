require("dotenv").config();
const nodemailer = require("nodemailer");

//Send your email from
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    // Your Gmail email password (or an app-specific password)
    pass: process.env.APP_PASSWORD,
  },
});

function sendMail(email, value) {

  console.log("sendMail: ", value);
  // Setup email data
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Regarding todo task",
    // text: `This is a friendly reminder that your todo task ${value} is about to expire. Please take action as soon as possible.`,
    html: `<p>This is a friendly reminder that your todo task "${value}" is about to expire. Please take action as soon as possible.</p>`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error.message);
    } else {
      console.log("Email sent successfully!");
    }
  });
}

module.exports = sendMail;
