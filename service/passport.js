const passport = require("passport");
const User = require("../model/users");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local");

const localLogin = new localStrategy(
  { usernameField: "username" },
  (username, pass, done) => {
    User.findOne({ username: username })
      .exec()
      .then((us) => {
        if (us) {
          us.comparePass(pass, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (!isMatch) {
              return done(null, false);
            }
            return done(null, us);
          });
        } else {
          return done("can not find user", false);
        }
      })
      .catch((err) => {
        if (err) {
          return done(err);
        }
      });
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("sabti"),
  secretOrKey: "skjdhws8904w3biusdb928nisbdamiraliali",
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log("dddds");
  // User.findById(payload.sub)
  //   .exec()
  //   .then((us) => {
  //     if (us) {
  //       return done(null, us);
  //     } else {
  //       return done(null, false);
  //     }
  //   })
  //   .catch((err) => {
  //     if (err) {
  //       return done(err);
  //     }
  //   });
});

passport.use(jwtLogin);
passport.use(localLogin);
