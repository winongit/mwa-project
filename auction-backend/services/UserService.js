const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model("User");

const registerUser = async (user) => {
  let newUser = new User(user);
  newUser.password = bcrypt.hashSync(user.password, 10);
  try {
    await User.create(newUser);
    newUser.password = undefined;
    return newUser;
  } catch (err) {
    return err.message;
  }
};

module.exports = { registerUser };
