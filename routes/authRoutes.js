const express = require("express");
const router = express.Router();
const {
  handleLoginSuccess,
  handleLoginFailure,
  handleLogout,
  handlePassportAuthenticate,
  handlePassportAuthenticateCallback,
} = require("../controllers/auth");


router.get("/login/success", handleLoginSuccess);
router.get("/login/failed", handleLoginFailure);

//auth logout
router.get("/logout", handleLogout);

// auth with google
router.get("/google", handlePassportAuthenticate());

// callback route for google to redirect to
router.get("/google/redirect", handlePassportAuthenticateCallback());

module.exports = router;