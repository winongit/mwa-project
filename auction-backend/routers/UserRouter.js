const express = require("express");
const router = express.Router();
const {
  register,
  login,
  checkEmail,
  uploadPhoto,
} = require("../controllers/UserController");
const multer = require("multer");
const path = require("path");
const { fileFilterFunc } = require("../common/UploadPhotosConfig");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../assets/pics/user"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffiix = Date.now() + "_" + file.originalname;
    console.log(uniqueSuffiix);
    cb(null, uniqueSuffiix);
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilterFunc });

router.post("/auth/signUp", register);
router.post("/auth/signIn", login);
router.get("/checkEmail", checkEmail);
router.post("/upload", upload.single("picture"), uploadPhoto);

module.exports = router;
