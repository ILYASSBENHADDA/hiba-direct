const express = require('express')
const router = express.Router()
const { getFundraiserTrue, getFundraiserItem, payment, updateFundraiser, createFundraiser } = require('../controllers/general')
const uploadMulter = require('../utils/upload')
// ----------------------------------------------------------------


// Create Fundraiser
router.post('/create-fundraiser', uploadMulter, createFundraiser)


// Get Fundraiser
router.get('/get-fundraiser', getFundraiserTrue)


// Get Fundraiser item
router.get('/get-fundraiser/:id', getFundraiserItem)


// Payment
router.post('/payment', payment)


// Update Fundraiser
router.post('/update-fundraiser/:id', uploadMulter, updateFundraiser)


module.exports = router



















// const multer = require('multer')
// const upload = multer()
// const fs = require("fs");
// const { promisify } = require('util');
// const pipeline = promisify(require('stream').pipeline);

// // General
// router.post('/create-fundraiser', upload.single('image'), async (req, res) => {

//      const {
//           file,
//           body: { city, amount, title, description }
//      } = req;

//      const fileName = 'image' + Math.floor(Math.random() * 1000) + file.detectedFileExtension;
//      await pipeline(
//        file.stream,
//        fs.createWriteStream(`${__dirname}/../images/${fileName}`)
//      );
   
//      // res.send("File uploaded as " + fileName);

//      new Fundraiser({
//           city: city,
//           amount: amount,
//           image: fileName,
//           title: title,
//           description: description,

//      })
//      .save()
//      .then(data => {
//           return res.json(data)
//      })
// })
