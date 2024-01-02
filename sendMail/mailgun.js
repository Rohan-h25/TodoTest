require("dotenv").config();

const API_KEY = process.env.MAILGUN_API;
const DOMAIN = process.env.MAILGUN_DOMAIN;

// import formData from "form-data";
// import Mailgun from "mailgun.js";
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun();
const client = mailgun.client({ username: "api", key: API_KEY });

const messageData = {
  from: "Excited User <rahulnilakesh@gmail.com>",
  to: "six.semester25@gmail.com",
  subject: "Hello MailGun",
  text: "Testing some Mailgun awesomeness!",
};

client.messages
  .create(DOMAIN, messageData)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });


