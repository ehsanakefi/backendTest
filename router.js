const bodyParser = require("body-parser");
const passportService = require("./service/passport");
const passport = require("passport");

// const userController = require("./controller/userController");
// const MyService = require("./myServes");
const Authentication = require("./controller/authentication");

var jsonParser = bodyParser.json();

module.exports = (app) => {
  app.post("/login", jsonParser, Authentication.login);
  app.post("/register", jsonParser, Authentication.register);
  app.get("/getusers", jsonParser, Authentication.getUsers);
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
  });
};
