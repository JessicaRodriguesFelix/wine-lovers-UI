import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./passport.js";
import router from "./routes/auth.js";

const GOOGLE_CLIENT_ID =
  "477484557872-qdpaaesjpqb9qsatsg92liboc16d9oe2.apps.googleusercontent.com";
const GOOGLE_CONSUMER_SECRET = "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";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    method: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(
  session({
    secret: GOOGLE_CONSUMER_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 },
    expires: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", router);

app.listen("5000", () => {
  console.log("server running on port 5000");
});
