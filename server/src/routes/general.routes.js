const express = require('express')
const router = express.Router()
const { getFundraiserTrue, getFundraiserItem, payment } = require('../controllers/general')
const Fundraiser = require('../models/fundraiser')
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const jwt = require('jsonwebtoken')



// Create Fundraiser
router.post('/create-fundraiser', upload.single('image'), async (req, res, next) => {
     
     const { city, category, amount, title, description } = req.body

     // Get user role & id
     let role 
     let user_id
     const token = req.cookies.admin || req.cookies.user
     if (token) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               role = decodedToken.role
               user_id = decodedToken.id
          })
     }


     try {
          // Upload image to cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);
     
          let fundraiser

          if (role === 'admin') {
               // Create new Fundraiser
               fundraiser = new Fundraiser({
                    user_id: user_id,
                    city_id: city,
                    category_id: category,
                    amount: amount,
                    image: result.secure_url,
                    title: title,
                    description: description,
                    isAccepted: true
               });
          } 
          else {
               // Create new Fundraiser
               fundraiser = new Fundraiser({
                    user_id: user_id,
                    city_id: city,
                    category_id: category,
                    amount: amount,
                    image: result.secure_url,
                    title: title,
                    description: description,
               });
          }
          

          // Save user
          await fundraiser.save();
          res.json(fundraiser);
     } 
     catch (err) {
          console.log(err);
     }

})



// Get Fundraiser
router.get('/get-fundraiser', getFundraiserTrue)


// Get Fundraiser item
router.get('/get-fundraiser/:id', getFundraiserItem)


// Payment
router.post('/payment', payment)


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
