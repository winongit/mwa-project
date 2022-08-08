const express = require('express');
const router = express.Router();

const {createBid} = require('../controllers/BiddingController')

router.post('/auction/:auction_id', createBid);

module.exports = router;
