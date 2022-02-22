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
  // console.log(req.fcmToken, user, "user");
  if (!username || !password) {
    return res
      .status(422)
      .send({ error: "you most send your password or username!" });
  }

  User.findOne({ username: username })
    .exec()
    .then(async (user) => {
      if (user) {
        user.comparePass(password, (err, isMatch) => {
          if (err) {
            return res.send({ peygham: err });
          }
          if (!isMatch) {
            return res.send({ peygham: "username or password is incurrent" });
          }

          return res.send({ token: tok(user), user: user });
        });
      } else {
        return res.send({ peygham: "username or password is incurrent" });
      }
    });
  // if (req.body.fcmToken) {
  //   user.fcmToken = req.body.fcmToken
  //   user.save()
  //     .then((userSaved) => res.send({ token: tok(userSaved), userSaved }))
  //     .catch((err) => res.status(422).send({error: 'we have a issue!'}))
  // } else {
  //   return res.send({ token: tok(req.user), user })
  // }
};

exports.register = (req, res, next) => {
  // console.log('req.bodt az register Authentication', req.body);

  // let { email, password, phone, address, name, familyName, shahr, taxibs } = req.body
  let { name, username, password } = req.body;

  // phone = pnumber.toEnglishDigits(phone.toString())

  if (!username || !password || !name) {
    return res
      .status(422)
      .send({ error: "you most have  username password and name" });
  }

  // phone = Tell.phoneMobile(phone);

  User.findOne({ username: username })
    .exec()
    .then((userFind) => {
      if (userFind) {
        return res.status(422).send({ error: "UserName e has" });
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
