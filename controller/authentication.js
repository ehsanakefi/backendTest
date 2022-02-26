const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/users");
const res = require("express/lib/response");
// const config = require("../config");
// const Tell = require("../service/telephone");
// const _ = require("lodash");

function tok(user) {
  return jwt.sign({ user }, "skjdhws8904w3biusdb928nisbdamiraliali");
}

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(422)
      .send({ error: "you most send your password or username!" });
  }

  User.findOne({ username: username })
    .exec()
    .then((userFind) => {
      userFind &&
        bcrypt
          .compare(userFind.password, password)
          .then((result) => {
            return res.json({ token: tok(userFind), user: userFind });
          })
          .catch(() => {
            return res
              .status(401)
              .send({ error: "you most have  username password " });
          });
    })
    .catch((err) => res.status(422).send({ error: "login failed", err }));
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
  req.rawHeaders[1]
    ? jwt.verify(
        req.rawHeaders[1],
        "skjdhws8904w3biusdb928nisbdamiraliali",
        (err, user) => {
          if (err) return res.sendStatus(403);
          User.find()
            .limit(30)
            .sort({ _id: -1 })
            .exec()
            .then((users) => res.json({ users }))
            .catch((err) => res.status(422).send({ error: "request failed" }));
        }
      )
    : res.status(402).send({ error: "please enter Token" });
};
