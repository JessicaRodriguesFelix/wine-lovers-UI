import express from "express";
import passport from "../passport.js";
import bcrypt from "bcrypt";

const router = express.Router();

const users = [];

const CLIENT_URL = "http://localhost:3000/store";

router.get("/login/success", (req, res) => {
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
  req.logout(function (err) {
    if (err) {
      console.error(err);
    }
    res.redirect("http://localhost:3000/login");
  });
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

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "This email is already associated with an account.",
      });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = { username, email, passwordHash };

    // Add the new user to the users array
    users.push(newUser);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export default router;
