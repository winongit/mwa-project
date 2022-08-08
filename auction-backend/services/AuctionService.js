const Auction = require('../models/Auction')

async function createAuction(auction) {
    auction.status = 'A';
    auction.created_at = Date.now();

    let auctionFromDB = await Auction.create(auction);
    return auctionFromDB;
} 

async function getAllAuctions(req, res) {
    let authenticatedUserId = req.user._id;

    // Filtering Auction
    let auctions = await Auction.find({});

    // loop through array;
    auctions.forEach(auction => {
        // Get max bid amount
        let max = Math.max(...auction.bids.map(b => b.bid_amount));
        auction.max_bid_amount = max;

        if (auction._id !== req.user._id) {
            auction.bid = auction.bids.filter(a => a._id === req.user._id);
        }
    });

    // if (req.userid != auction.id) 
        // filter the bidszz
    // update bid in auciton
    

    return auctions;
}

async function getAuction(req, res, auction_id) {
    let auction = await Auction.findById(auction_id);

    auction.bids = auction.bids.filter(a => a._id === req.user._id);

    return auction;
}

module.exports = {createAuction, getAllAuctions, getAuction};