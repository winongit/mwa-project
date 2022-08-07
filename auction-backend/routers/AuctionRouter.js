const express = require("express");
const router = require("./UserRouter");
const {
  createAuction,
  uploadPhoto,
  getAllAuctions,
} = require("../controllers/AuctionController");

const multer = require("multer");
const path = require("path");
const { checkToken } = require("../middlewares/checkToken");

const maxFileSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../assets/pics/auction"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffiix = Date.now() + "_" + file.originalname;
    console.log(uniqueSuffiix);
    cb(null, uniqueSuffiix);
  },
});

const fileFilterFunc = (req, file, cb) => {
  const fileSize = parseInt(req.headers["content-length"]);
  console.log("fileSize " + fileSize);
  console.log(typeof file.mimetype);
  console.log(file.mimetype === "image/jpeg");
  if (fileSize >= maxFileSize) {
    cb("bigfilesize", false);
  } else if (
    file.mimetype !== "image/jpg" &&
    file.mimetype !== "image/jpeg" &&
    file.mimetype !== "image/png"
  ) {
    cb("invalidfiletype", false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilterFunc });

// (/auctions)
router.get("/", checkToken, getAllAuctions);

router.post("/", checkToken, createAuction);

router.post("/upload", checkToken, upload.single("picture"), uploadPhoto);

module.exports = router;
