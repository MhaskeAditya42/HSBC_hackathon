// const express = require('express');
// const transaction = express();


// const multer = require('multer');
// const path= require('path');

// const bodyParser=  require('body-parser');
 
// transaction.use(bodyParser.urlencoded({extended:true}));

// transaction.use(express.static(path.resolve(__dirname,'public')));

// var storage= multer.diskStorage({
//     destination:(req,file,cb)=>{
//          cb(null,'../public/uploads')
//     },
//     filename:(req,file,cb)=>{
//           cb(null,file.originalname)
//     }
// });

// var upload=multer({storage:storage});

// const transactionController= require('../controllers/transactionController');

// transaction.post('/exportTransaction',upload.single('file'),transactionController.exportTransaction);

// module.exports= transaction;


const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const csv = require('csvtojson');

const transaction = express();

transaction.use(bodyParser.urlencoded({ extended: true }));

transaction.use(express.static(path.resolve(__dirname, 'public')));

const transactionController = require('../controllers/transactionController');

// Assuming the file name is provided as a query parameter
//transaction.get('/exportTransaction', transactionController.exportTransaction);
transaction.post('/exportTransaction', transactionController.exportTransaction);


module.exports = transaction;
