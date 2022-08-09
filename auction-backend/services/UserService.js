const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (user) => {
  let newUser = new User(user);
  newUser.password = bcrypt.hashSync(user.password, 10);
  await User.create(newUser);
  newUser.password = undefined;
  return newUser;
};

const signIn = async (user) => {
  let foundUser = await User.findOne({
    email: user.email,
  });
  if (!foundUser || !foundUser.comparePassword(user.password)) {
    throw "Authentication failed. Invalid email or password.";
  }
  return {
    token: jwt.sign(
      { email: foundUser.email, name: foundUser.name, _id: foundUser._id },
      "SECRET",
      {
        expiresIn: "24h",
      }
    ),
  };
};

const checkEmail = async (email) => {
  let user = await User.findOne({ email: email });
  return user;
};

module.exports = { registerUser, signIn, checkEmail };
