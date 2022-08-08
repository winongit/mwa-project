const express = require("express");
const router = express.Router();
const {
  createAuction,
  uploadPhoto,
  getAllAuctions,
  getAuction,
} = require("../controllers/AuctionController");

const multer = require("multer");
const path = require("path");
const { fileFilterFunc } = require("../common/UploadPhotosConfig");

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

const upload = multer({ storage: storage, fileFilter: fileFilterFunc });

// (/auctions)
router.get("/", checkToken, getAllAuctions);

router.get("/:auction_id", getAuction);

router.post("/", createAuction);

router.post("/upload", upload.single("picture"), uploadPhoto);

module.exports = router;
