import GoogleStrategy from "passport-google-oauth20";

import passport from "passport";

const GOOGLE_CLIENT_ID =
  "477484557872-qdpaaesjpqb9qsatsg92liboc16d9oe2.apps.googleusercontent.com";
const GOOGLE_CONSUMER_SECRET = "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";

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
