import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

import passport from "passport";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CONSUMER_SECRET = process.env.GOOGLE_CONSUMER_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CONSUMER_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (token, tokenSecret, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
