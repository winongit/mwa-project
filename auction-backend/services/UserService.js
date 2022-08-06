const User = require('../models/User')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const signIn = async (user) => {
  try {
    let foundUser = await User.findOne({
      email: user.email,
    });
    if (!foundUser || !foundUser.comparePassword(user.password)) {
      return {
        message: "Authentication failed. Invalid user or password.",
      };
    }
    return {
      token: jwt.sign(
        { email: user.email, name: user.name, _id: user._id },
        "RESTFULAPIs", {
          expiresIn:"24h"
        }
      ),
    };
  } catch (err) {
    return err.message;
  }
};

module.exports = { registerUser, signIn };
