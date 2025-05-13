const mongoose = require("mongoose");
const gratavar = require("gravatar");
const bCrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const user = new Schema({
  email: { type: String, required: [true], minLength: 2 },
  password: { type: String, required: [true], minLength: 2 },
  avatarUrl: { type: String, minLength: 2 },
});

user.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

user.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

user.pre("save", function (next) {
  if (!this.avatarUrl) {
    this.avatarUrl = gratavar.url(
      this.email,
      {
        s: 200,
        r: "pg",
        d: "idention",
      },
      true
    );
  }
  next();
});

const User = mongoose.model("users", user);
module.exports = User;
