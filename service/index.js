const User = require("./schemas/UserSchema");

const getAllUsers = async () => {
  return await User.find();
};

module.exports = { getAllUsers };
