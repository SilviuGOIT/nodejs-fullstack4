const mongoose = require("mongoose");

const bCrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const user = new Schema({
  email: { type: "string", required: [true], minLength: 2 },
  password: { type: "string", required: [true], minLength: 2 },
});

user.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

user.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model("users", user);
module.exports = User;
