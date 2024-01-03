const sendMail = require("./nodemailer.js");
const User = require("../database/models/User.js");
const moment = require('moment-timezone');

function scheduleMail(user) {

  const intervalId = setInterval(() => {
    // Executing a function every 1 minutes(1*60*1000)
    console.log("Executing a function.....");
    User.findOne({ googleId: user.googleId }).then((currentUser) => {
      if (currentUser) {
        //already have a user
        const todos = currentUser.todos;
        if (todos.length !== 0) {

          const timeZone = 'Asia/kolkata';

          const currentTimeStamp = Date.now();
          const now = moment(currentTimeStamp).tz(timeZone);

          const hours = now.format('HH'); // 24-hour format
          const minutes = now.format('mm');
          const currtime = parseInt(hours)*60 + parseInt(minutes);

          todos.forEach((todo) => {            
            if (todo.time <= currtime + 6) {
                sendMail(currentUser.email, todo.value);
            }
          });
        }
      } else {
        console.log("Fail to fetch user");
      }
    });
  }, 60000);
}

module.exports = scheduleMail;
