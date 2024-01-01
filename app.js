require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth-routes.js");
const passportSetup = require("./config/passport-setup.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
const port = process.env.PORT || 4000;
const User = require("./database/models/User.js");

const mailchimp = require("./sendMail/mailchimp.js");


const app = express();

app.use(express.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.cookieSessionKey],
  })
);

//initialize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

//connect to mongoDB
// const { connectMongoose } = require("./database/database.js");
// connectMongoose();

//connect to mongodb Atlas
const mongoose = require("mongoose");
mongoose.connect(process.env.URL);

// Get the default connection
const db = mongoose.connection;

// Event handlers for Mongoose connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  // You can start interacting with the database here
});

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_URL,
  })
);

//set up routes
app.use("/auth", authRoutes);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

app.get("/todos", authCheck, (req, res) => {
  console.log("gettodo");
  // console.log(req.user.todos);
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    todos: req.user.todos,
    cookies: req.cookies,
  });
});

app.post("/addtodo", authCheck, async (req,res) => {
  console.log("addtodo");
  // console.log(req.body.todo);
  try {
    const update = {
      $push : {
        todos: req.body.todo
      }
    } 
    await User.updateOne({ googleId: req.user.googleId }, update)
  } catch(e) {
    console.log("Error in updating todos: ", e);
  }
  // res.redirect(CLIENT_TODO_PAGE_URL);
  res.status(200).send("todo added");
});

app.post("/deletetodo", authCheck, async (req,res) => {
  console.log("deletetodo");
  // console.log(req.body.id);
  try {
    const update = {
      $pull : {
        todos: {id: req.body.id}
      }
    }
    await User.updateOne({ googleId: req.user.googleId }, update)
  } catch(e) {
    console.log("Error in deleting todo: ", e);
  }
  // res.redirect(CLIENT_TODO_PAGE_URL);
  res.status(200).send("todo deleted");
});

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
  // console.log(req.user);
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
