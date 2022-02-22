const bodyParser = require("body-parser");
const passportService = require("./service/passport");
const passport = require("passport");

// const userController = require("./controller/userController");
// const MyService = require("./myServes");
const Authentication = require("./controller/authentication");

var jsonParser = bodyParser.json();
const reqAuth = passport.authenticate("jwt", { session: false }, () =>
  console.log("ffff")
);
const reqSignin = passport.authenticate("local", { session: false });

module.exports = (app) => {
  app.post("/login", jsonParser, reqSignin, Authentication.login);
  app.post("/register", jsonParser, Authentication.register);
  app.get("/getusers", jsonParser, reqAuth, Authentication.getUsers);
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
  });
};
