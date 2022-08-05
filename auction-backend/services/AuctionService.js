const Auction = require('../models/Auction')

async function createAuction(auction) {
    auction.status = 'A';

    let auctionFromDB = await Auction.create(auction);
    return auctionFromDB;
} 

module.exports = {createAuction};