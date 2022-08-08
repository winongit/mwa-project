const Auction = require('../models/Auction')

async function createAuction(auction) {
    auction.status = 'A';
    auction.created_at = Date.now();

    let auctionFromDB = await Auction.create(auction);
    return auctionFromDB;
} 

async function getAllAuctions() {
    let auctions = await Auction.find({});
    return auctions;
}

async function getAuction(auction_id) {
    let auction = await Auction.findById(auction_id);
    return auction;
}

module.exports = {createAuction, getAllAuctions, getAuction};