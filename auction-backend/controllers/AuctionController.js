const {createAuction, getAllAuctions} = require('../services/AuctionService');

module.exports.createAuction = async(req, res) => {
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

module.exports.uploadPhoto = (req, res) => {
    res.status(200).json({filename: req.file.filename});
};

module.exports.getAllAuctions = async(req, res) => {
    try {
        let auctions = await getAllAuctions();
        res.json(auctions);
    } catch (error) {
        console.log(err);
        return res.status(400).send({
            message: err
        });
    } 
}