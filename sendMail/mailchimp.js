require("dotenv").config();

//transactional

// const mailchimpTx = require("@mailchimp/mailchimp_transactional")(process.env.MANDRILL_API_KEY);

// async function run() {
//   const response = await mailchimpTx.users.ping();
//   console.log(response);
// }

// run();

// exports.module = run;

const mailchimpClient = require("@mailchimp/mailchimp_transactional")(
    process.env.MANDRILL_API_KEY
);

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

//   UTC timestamp in YYYY-MM-DD HH:MM:SS format
const run = async () => {
    const response = await mailchimpClient.messages.send({ message });
    console.log(response);
  };
run();

// exports.module = run;






//marketing

// const client = require("@mailchimp/mailchimp_marketing");

// client.setConfig({
//   apiKey: process.env.API_KEY,
//   server: "YOUR_SERVER_PREFIX",
// });

// const run = async () => {
//   const response = await client.campaigns.schedule("campaign_id", {
//     schedule_time: "2023-12-20T16:44:39.965Z",
//   });
//   console.log(response);
// };

// run();
