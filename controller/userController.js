const mongoose = require("mongoose");
const User = require("../models/users");

const jwt = require("jwt-simple");
const config = require("../config");

const creatToken = (_id) => {
  const date = new Date();
  return jwt.encode(
    {
      sub: _id,
      iat: date,
    },
    config.mySecret
  );
};
exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  return res.send("ok");
};

exports.signup = (req, res, next) => {
  // console.log('req.body az addCity CityController', req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(500).send("Something broke!");
  }

  User.findOne({ email: email })
    .exec()
    .then((userFinded) => {
      console.log("userFinded");

      console.log(userFinded);
      if (userFinded) {
        return res.status(500).send("Something broke!");
      }
      console.log("userFinded  frs");
      const newusers = new User({
        // email: req.body.email,
        // password: req.body.password
        email: email,
        password: password,
      });
      console.log("userFinded  se");
      newusers
        .save()
        .then((savedUser) => res.json({ token: creatToken(savedUser._id) }));
      console.log("userFinded  th");
    })
    .catch((err) => res.status(500).send("Something broke!"));
};

module.exports.getOwnUser = (req, res) => {
  {
    res.json({ user: req.user });
  }
};
