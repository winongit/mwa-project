const express = require("express");
const {
  register,
  login,
  checkEmail,
} = require("../controllers/UserController");
const router = express.Router();

router.post("/auth/signUp", register);
router.post("/auth/signIn", login);
router.get("/checkEmail", checkEmail);

module.exports = router;
