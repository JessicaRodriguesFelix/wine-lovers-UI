import express from "express";
import passport from "../passport.js";

const router = express.Router();

const CLIENT_URL = "http://localhost:3000/store";

router.get("/login/sucess", (req, res) => {
  if (req.user) {
    res.status(200).json({
      sucess: true,
      message: "sucessfull",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    sucess: false,
    message: "failure",
  });
});
router.get("/logout", (req, res) => {
  req.logout();
  const googleLogoutURL = "https://accounts.google.com/logout";
  res.redirect(googleLogoutURL);
});
console.log(passport);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

export default router;