const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  name: { type: String },
  password: { type: String, select: true },
});

UserSchema.pre("save", function (next) {
  let user = this;
  console.log("user");
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  next();
});

UserSchema.methods.comparePass = function (condidatePassword, callback) {
  bcrypt.compare(condidatePassword, this.password, (err, isMatch) => {
    if (err) {
      console.log("error", err);
      // console.log('Err az comparePass user methods :', err);
      return callback(err);
    }

    callback(null, isMatch);
  });
};
const ModelUser = mongoose.model("user", UserSchema);

module.exports = ModelUser;
