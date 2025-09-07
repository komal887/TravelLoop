const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// Signup form
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

// Signup logic
router.post("/signup", async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to TravelLoop 🎉");
      res.redirect("/chatbot");
    });

  } catch (e) {
    req.flash("error", e.message);   //  FIXED HERE
    res.redirect("/signup");
  }
});

// Login form
router.get("/login", (req, res) => {
  res.render("users/login.ejs");   //  No need to pass error/success manually
});

// Login logic
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,   // shows error flash automatically
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to TravelLoop!");
    let redirectUrl = res.locals.redirectUrl || "/chatbot";
    res.redirect(redirectUrl);
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash("success", "You have logged out successfully!");
    res.redirect("/travel");
  });
});

module.exports = router;
