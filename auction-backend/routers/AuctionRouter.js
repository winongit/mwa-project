const express = require('express');
const router = require('./UserRouter');

const { createAuction } = require('../controllers/AuctionController');

// (/auctions)
router.post('/', createAuction);

module.exports = router;