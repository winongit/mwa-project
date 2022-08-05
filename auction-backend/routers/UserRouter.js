const express = require("express");
const { register, login } = require("../controllers/UserController");
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/signIn", login);

module.exports = router;
