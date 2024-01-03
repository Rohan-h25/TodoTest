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
          const now = moment(currentTimeStamp).tz(timeZone).format();
          console.log("now date: ", now);
          const currtime = now.getHours()*60 + now.getMinutes();

          todos.forEach((todo) => { 
            console.log("TodoValue: ", todo.value); 
            console.log("TodoTime: ", todo.time);
            console.log("TodoCurrTime + 5: ", (currtime + 5));           
            if (todo.time <= currtime + 5) {
                console.log("sendMail");
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
