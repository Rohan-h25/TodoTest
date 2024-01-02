const sendMail = require("./nodemailer.js");
const User = require("../database/models/User.js");

function scheduleMail(user) {

  const intervalId = setInterval(() => {
    // Executing a function every 2.5 minutes(2.5*60*1000)
    console.log("Executing a function.....");
    User.findOne({ googleId: user.googleId }).then((currentUser) => {
      if (currentUser) {
        //already have a user
        const todos = currentUser.todos;
        if (todos.length !== 0) {

          const now = new Date();
          const currtime = now.getHours()*60 + now.getMinutes();

          todos.forEach((todo) => {            
            if (todo.time <= currtime + 5) {
                sendMail(currentUser.email);
            }
          });
        }
      } else {
        console.log("Fail to fetch user");
      }
    });
  }, 150000);
}

module.exports = scheduleMail;
