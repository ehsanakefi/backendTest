const bodyParser = require("body-parser");
const passport = require("passport");

// const userController = require("./controller/userController");
// const MyService = require("./myServes");
const Authentication = require("./controller/authentication");

var jsonParser = bodyParser.json();
const requireAuth = passport.authenticate("jwt", { session: false });
// const requireSignin = passport.authenticate("local", {
//   failureRedirect: "/login",
//   failureMessage: true,
// });

module.exports = (app) => {
  app.post("/login", jsonParser, Authentication.login);
  app.post("/register", jsonParser, Authentication.register);
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
  });
};
