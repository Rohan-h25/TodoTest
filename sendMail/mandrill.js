require("dotenv").config();
const mandrill = require('mandrill-api/mandrill');
const mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

const message = {
    html: "<p>Hello from todo</p>",
    text: "Hello from todo",
    subject: "Learn Mailchimp",
    from_email: "rahulnilakesh@gmail.com",
    from_name: "todo",
    to: [
      {
        email: "six.semester25@gmail.com",
        name: "SemesterSix",
        type: "to",
      },
    ],
  };

mandrillClient.messages.send({ message }, (result) => {
  console.log(result);
}, (err) => {
  console.error(err);
});

// console.log("mandrill");
