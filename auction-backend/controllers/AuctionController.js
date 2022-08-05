const {createAuction} = require('../services/AuctionService');

exports.createAuction = async(req, res) => {
    try {
        console.log('I am on create auction');
        const auctionFromWeb = req.body;
        console.log(auctionFromWeb);
        let auction = await createAuction(auctionFromWeb);
        res.json(auction);
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            message: err
        });
    }
}