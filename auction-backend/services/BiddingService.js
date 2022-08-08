const Auction = require('../models/Auction');

async function createBid(bid, auctionId) {
    bid.status = 'A';
    bid.created_at = Date.now();
    bid.updated_at = Date.now();

    console.log('bid udpdate');
    console.log(auctionId);
    console.log(bid);

    let auctionFromDB = await Auction.findById(auctionId);

    if (bid.bid_amount < auctionFromDB.price) {
        throw 'bid amount is less than auction amount';
    }

    // created_by and modified by will be added by the middle ware
    let response = await Auction.updateOne({_id: auctionId},
        {$push: {bids: bid}});

    auctionFromDB = await Auction.findById(auctionId);

    return auctionFromDB;
} 

module.exports = {createBid}