require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../database/models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
  new GoogleStrategy(
    {
      //options for google strat
      
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      //passport cb
      //check if user already exist in our database

      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          //already have a user
          // console.log("User is: ", currentUser);
          done(null, currentUser);
        } else {
          console.log("profile: ", profile);
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              // console.log("new user created: " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
