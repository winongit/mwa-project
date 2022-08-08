const {createBid, deleteBid} = require('../services/BiddingService');

module.exports.createBid = async(req, res) => {
    try {
        console.log('I am on create bid');
        const {auction_id} = req.params;
        const bidFromWeb = req.body;

        bidFromWeb.created_by = req.user;
        bidFromWeb.modified_by = req.user;

        let bid = await createBid(req, res, bidFromWeb, auction_id);
        res.json(bid);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: err
        })
    }
}

module.exports.deleteBid = async (req, res) => {
    try {
        const {bid_id, auction_id} = req.params;

        let respose = await deleteBid(req, res, auction_id, bid_id);
        res.json(respose);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: error
        })
    }
}