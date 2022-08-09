const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (user) => {
  console.log(user);
  let newUser = new User(user);
  console.log(newUser);
  newUser.password = bcrypt.hashSync(user.password, 10);
  await User.create(newUser);
  newUser.password = undefined;
  return newUser;
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

    console.log(foundUser.imgUrl);

    return {
      token: jwt.sign(
        {
          email: foundUser.email,
          name: foundUser.name,
          _id: foundUser._id,
          imgUrl: foundUser.imgUrl,
        },
        "SECRET",
        {
          expiresIn: "24h",
        }
      ),
    };
  } catch (err) {
    return err.message;
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
