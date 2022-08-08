const {createBid} = require('../services/BiddingService');

module.exports.createBid = async(req, res) => {
    try {
        console.log('I am on create bid');
        const {auction_id} = req.params;
        const bidFromWeb = req.body;

        bidFromWeb.created_by = req.user;
        bidFromWeb.modified_by = req.user;

        let bid = await createBid(bidFromWeb, auction_id);
        res.json(bid);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: err
        })
    }
}