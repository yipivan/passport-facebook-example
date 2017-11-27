const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

module.exports = (app)=>{
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null,{profile:profile,accessToken:accessToken});
    }
  ));
  
  passport.serializeUser((user,done)=>{
    done(null,user);
  });

  passport.deserializeUser((user,done)=>{
    done(null,user);
  });
}
