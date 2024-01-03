require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const CLIENT_TODO_PAGE_URL = process.env.CLIENT_TODO_PAGE_URL;
const CLIENT_LOGIN_PAGE_URL = process.env.CLIENT_LOGIN_PAGE_URL;
const CLIENT_LOGIN_FAILED_PAGE_URL = process.env.CLIENT_LOGIN_FAILED_PAGE_URL;

const scheduleMail = require("../sendMail/scheduleMail");

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  console.log("in login/success route");
  if (req.user) {
    scheduleMail(req.user);
    res.status(200).json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      // cookies: req.cookies,
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  // console.log(req);
  // res.redirect(CLIENT_LOGIN_FAILED_PAGE_URL);
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

//auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  req.logOut();
  res.redirect(CLIENT_LOGIN_PAGE_URL);
});

// auth with google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// callback route for google to redirect to
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: CLIENT_TODO_PAGE_URL,
    // successRedirect: "auth/login/success",
    failureRedirect: CLIENT_LOGIN_FAILED_PAGE_URL,
    // failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
