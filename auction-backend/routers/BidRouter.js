const express = require('express');
const router = express.Router();

const {createBid, deleteBid} = require('../controllers/BiddingController')

router.post('/auction/:auction_id', createBid);

router.delete('/:bid_id/auction/:auction_id', deleteBid);

module.exports = router;
