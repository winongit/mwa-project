const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// auction

// bidding

// user
    // sign up user
    

// login

//

app.listen(3000, () => console.log('Listening on port 3000'));