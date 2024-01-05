require("dotenv").config();
const CLIENT_TODO_PAGE_URL = process.env.CLIENT_TODO_PAGE_URL;
const CLIENT_LOGIN_PAGE_URL = process.env.CLIENT_LOGIN_PAGE_URL;
const CLIENT_LOGIN_FAILED_PAGE_URL = process.env.CLIENT_LOGIN_FAILED_PAGE_URL;

const passport = require("passport");

const scheduleMail = require("../sendMail/scheduleMail");

function handleLoginSuccess(req, res) {
  console.log("in login/success route");
  if (req.user) {
    console.log("login success.");
    scheduleMail(req.user);
    res.status(200).json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    console.log("login failed.");
  }
}

function handleLoginFailure(req, res) {
  // console.log(req);
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
}

function handleLogout(req, res) {
  req.logOut();
  res.redirect(CLIENT_LOGIN_PAGE_URL);
}

function handlePassportAuthenticate() {
  return passport.authenticate("google", { scope: ["profile", "email"] });
}

function handlePassportAuthenticateCallback() {
  return passport.authenticate("google", {
    successRedirect: CLIENT_TODO_PAGE_URL,
    failureRedirect: CLIENT_LOGIN_FAILED_PAGE_URL,
  });
}

module.exports = {
  handleLoginSuccess,
  handleLoginFailure,
  handleLogout,
  handlePassportAuthenticate,
  handlePassportAuthenticateCallback,
};
