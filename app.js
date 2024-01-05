require("dotenv").config();
const express = require("express");
const connectMongoDBAtlas = require("./database/Atlas.js"); 
const cors = require("cors");

const Authroute = require("./routes/authRoutes.js");
const TodoRoutes = require("./routes/todoRoutes.js");

const passportSetup = require("./config/passportSetup.js");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();
const port = process.env.PORT;

//connect to mongodb Atlas
connectMongoDBAtlas(process.env.URL);

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_URL,
  })
);

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

//set up routes
app.use("/auth", Authroute);
app.use("/todo", TodoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
