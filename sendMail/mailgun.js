
api=699956f0d252bb144a3217ae6ddce8da-78f6ccbe-6ab386ed


const API_KEY = 'YOUR_API_KEY';
const DOMAIN = 'YOUR_DOMAIN_NAME';

 import formData from 'form-data';
 import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: API_KEY});

const messageData = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'foo@example.com, bar@example.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

client.messages.create(DOMAIN, messageData)
 .then((res) => {
   console.log(res);
 })
 .catch((err) => {
   console.error(err);
 });