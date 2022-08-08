const {createAuction, getAllAuctions, getAuction} = require('../services/AuctionService');

module.exports.createAuction = async(req, res) => {
    try {
        console.log('I am on create auction');
        const auctionFromWeb = req.body;

        
        auctionFromWeb.created_by = req.user;
        auctionFromWeb.modified_by = req.user;
        
        let auction = await createAuction(auctionFromWeb);
        res.json(auction);
    } catch (err) {
        console.log(err)
        res.status(400).send({
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
        console.log(error);
        res.status(400).send({
            message: ererrorr
        });
    } 
}

module.exports.getAuction = async (req, res) => {
    try {
        const {auction_id} = req.params;
        let auction = await getAuction(auction_id);
        res.json(auction);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: error
        });
    } 
    
}