const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
  createAuction,
  uploadPhoto,
  getAllAuctions,
  getAuction,
  cancelAuction,
  extendAuction,
} = require("../controllers/AuctionController");

const multer = require("multer");
const path = require("path");
const { fileFilterFunc } = require("../common/UploadPhotosConfig");

const MulterAzureStorage =
  require("multer-azure-blob-storage").MulterAzureStorage;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../assets/pics/auction"));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffiix = Date.now() + "_" + file.originalname;
//     console.log(uniqueSuffiix);
//     cb(null, uniqueSuffiix);
//   },
// });

const resolveBlobName = (req, file) => {
  return new Promise((resolve, reject) => {
    const blobName = Date.now() + "_" + file.originalname;
    console.log(blobName);
    resolve(blobName);
  });
};

const azureStorage = new MulterAzureStorage({
  connectionString: process.env.AZURE_CONNECTION_STRING,
  accessKey: process.env.AZURE_ACCESS_KEY,
  accountName: process.env.AZURE_ACCOUNT_NAME,
  containerName: process.env.AUCTION_CONTAINER_NAME,
  blobName: resolveBlobName,
  containerAccessLevel: "blob",
  urlExpirationTime: 0,
});

const upload = multer({
  storage: azureStorage,
  fileFilter: fileFilterFunc,
});

// const upload = multer({ storage: storage, fileFilter: fileFilterFunc });

// (/auctions)
router.get("/", getAllAuctions);

router.get("/:auction_id", getAuction);

router.post("/", createAuction);

router.post("/upload", upload.single("picture"), uploadPhoto);

router.patch("/:auction_id/cancel", cancelAuction);

router.patch("/:auction_id/extend", extendAuction);

module.exports = router;
