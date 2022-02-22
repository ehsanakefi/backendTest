const jwt = require("jwt-simple");
const User = require("../model/users");
// const config = require("../config");
// const Tell = require("../service/telephone");
// const _ = require("lodash");

function tok(user) {
  const allan = new Date().getTime();
  return jwt.encode(
    { sub: user._id, iat: allan },
    "skjdhws8904w3biusdb928nisbdamiraliali"
  );
}

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  console.log("lll");
  if (!username || !password) {
    return res
      .status(422)
      .send({ error: "you most send your password or username!" });
  }
};

exports.register = (req, res, next) => {
  let { name, username, password } = req.body;

  if (!username || !password || !name) {
    return res
      .status(422)
      .send({ error: "you most have  username password and name" });
  }

  User.findOne({ username: username })
    .exec()
    .then((userFind) => {
      if (userFind) {
        return res.status(422).send({ error: "register before" });
      } else {
        let user = new User({
          username,
          password,
          name,
        });
        console.log("slam");
        if (req.body.fcmToken) {
          user.fcmToken = req.body.fcmToken;
        }
        user
          .save()
          .then((userSaved) =>
            res.json({ token: tok(userSaved), user: userSaved })
          );
      }
    })
    .catch((err) => res.status(422).send({ error: "Register failed", err }));
};
exports.getUsers = (req, res, next) => {
  console.log("getuser");
  User.find()
    .limit(30)
    .sort({ _id: -1 })
    .exec()
    .then((users) => res.json({ users }))
    .catch((err) => res.status(422).send({ error: "anjam neshod" }));
};
