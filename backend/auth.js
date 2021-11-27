const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user-model");
const JWT_SECRET = "oivfdkhkvsuj348kjg";
const jwt = require("jsonwebtoken");
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "215779606617-p5unuegh2jn4imi24r643nttnmoq7vvl.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  const checkemail = user.emails[0].value;
  const newEntry = new User({
    username: user.displayName,
    pic: user.photos[0].value,
    email: user.emails[0].value,
  });

  User.findOne({ email: checkemail }).then(saveduser => {
    if (!saveduser) {
      const newEntry = new User({
        username: user.displayName,
        pic: user.photos[0].value,
        email: user.emails[0].value,
      });
      newEntry.save().then(res => {
        const token = jwt.sign({ id: res._id }, JWT_SECRET)
        // console.log(token)
        // console.log("success ", res)
        done(null, { token, loginuser: res });

      })
    }
    else {
      const token = jwt.sign({ id: saveduser._id }, JWT_SECRET)
      console.log("token   ", token)
      done(null, { token, loginuser: saveduser });
    }
  })
    .catch((err) => console.log("error from add user server", err));
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
