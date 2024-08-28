
const path = require('path');
const csv = require('csvtojson');
const fs = require('fs');
var Transaction= require('../models/Transaction');

const exportTransaction = async (req, res) => {
    try {
        // Get file name from query parameter
        const fileName = req.query.fileName;

        // Validate file name
        if (!fileName) {
            return res.status(400).send({ status: 400, success: false, msg: 'File name is required' });
        }

        // Construct the file path
        const filePath = path.join(__dirname, '../public/uploads', fileName);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).send({ status: 404, success: false, msg: 'File not found' });
        }
         
        
        // Read and parse CSV file
        const jsonArray = await csv().fromFile(filePath);
        console.log(jsonArray);
        const limitedJsonArray = jsonArray.slice(0, 100);

        const transactions = limitedJsonArray.map(item => {
            return {
                step: parseInt(item.step, 10) || 0, 
                customer: item.customer,
                age: isNaN(parseInt(item.age, 10)) ? null : parseInt(item.age, 10),
                gender: ['M', 'F', 'O'].includes(item.gender.toUpperCase()) ? item.gender.toUpperCase() : null, // Normalize gender
                zipcodeOri: item.zipcodeOri,
                merchant: item.merchant,
                zipMerchant: item.zipMerchant,
                category: item.category,
                amount: parseFloat(item.amount) || 0,
                fraud: item.fraud === 'true' || item.fraud === true
            };
        });
        await Transaction.insertMany(transactions);
        
        res.send({ status: 200, success: true, msg: 'Status ok', data: jsonArray });
    } catch (error) {
        res.status(500).send({ status: 500, success: false, msg: error.message });
    }
}

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({});

        res.send(transactions);
    } catch (error) {
        res.status(500).send({ status: 500, success: false, msg: error.message });
    }
}


module.exports = {
    exportTransaction,
    getTransactions
}
