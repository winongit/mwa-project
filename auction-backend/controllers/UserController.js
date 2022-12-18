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
    console.log("after get user");
    res.json(user);
  } catch (error) {
    console.log("i am error");
    console.log(error);
    res.status(400).send({
      message: error,
    });
  }
};

exports.checkEmail = async (req, res) => {
  try {
    let { email } = req.params;
    let user = await userService.checkEmail(email);
    return res.json(user);
  } catch (err) {
    return {
      message: err,
    };
  }
};

module.exports.uploadPhoto = (req, res) => {
  try {
    console.log(req.file);
    let fileurl = req.file.url.split("?")[0];
    console.log(fileurl);
    res.status(200).json({ filename: fileurl });
  } catch (err) {
    console.log(err);
  }
};
