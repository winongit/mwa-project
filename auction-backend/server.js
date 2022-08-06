const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongodb connection
mongoose.connect("mongodb://localhost:27017/AuctionDB", {
  useNewUrlParser: true,
});

// middlewares
app.use('/pictures', express.static(__dirname + '/assets/pics'));

// user
app.use("/users", require("./routers/UserRouter"));

// auction
app.use("/auctions", require('./routers/AuctionRouter'));


// bidding

// Url not match
app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err });
});

app.listen(3000, () => console.log("Listening on port 3000"));
