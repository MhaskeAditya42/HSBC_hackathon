

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const path= require('path');



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


mongoose.connect("mongodb+srv://adityamhaske711:LtwjJn8WymOzBi2f@hackathon-data.zhdhj.mongodb.net/?retryWrites=true&w=majority&appName=hackathon-data",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Increase the timeout to 30 seconds
    socketTimeoutMS: 30000  // Increase the socket timeout to 30 seconds
});

const User= require('./models/userModel');
const transactions=require('./models/Transaction');

// API key middleware for security
// const authenticate = (req, res, next) => {
//     const key = req.header('x-api-key');
//     if (key && key === API_KEY) {
//       next();
//     } else {
//       res.status(403).send('Forbidden');
//     }
//   };

var transactionRoute=require('./routes/transactionRoute');





app.use('/',transactionRoute);





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
