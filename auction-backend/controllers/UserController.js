const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = mongoose.model("User");
var userService = require("../services/UserService");

exports.register = async (req, res) => {
  try {
    let user = await userService.registerUser(req.body);
    return res.json(user);
  } catch (err) {
    return res.status(400).send({
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let user = await userService.signIn(req.body);
    return res.json(user);
  } catch (err) {
    return res.status(400).send({
      message: err,
    });
  }
};
