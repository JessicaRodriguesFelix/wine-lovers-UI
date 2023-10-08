import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./passport.js";
import router from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config();

const GOOGLE_CONSUMER_SECRET = process.env.GOOGLE_CONSUMER_SECRET;

//print out the environment variables to verify that they are being loaded correctly
// console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("GOOGLE_CONSUMER_SECRET:", process.env.GOOGLE_CONSUMER_SECRET);

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

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
