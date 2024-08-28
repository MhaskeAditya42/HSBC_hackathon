
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const csv = require('csvtojson');

const transaction = express();
const Transaction = require('../models/Transaction');

transaction.use(bodyParser.urlencoded({ extended: true }));

transaction.use(express.static(path.resolve(__dirname, 'public')));

const transactionController = require('../controllers/transactionController');

// Assuming the file name is provided as a query parameter


transaction.post('/exportTransaction', transactionController.exportTransaction);

transaction.get('/getTransactions', transactionController.getTransactions);



module.exports =transaction;
