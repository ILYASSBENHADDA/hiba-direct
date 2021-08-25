const Fundraiser = require('../models/fundraiser')
const jwt = require('jsonwebtoken')


/*
     Get Fundraiser for current user
*/
exports.getUserPost = (req, res) => {


     // Get current user id
     let user_id
     const token = req.cookies.user
     if (token) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               user_id = decodedToken.id
          })
     }

     Fundraiser.find({user_id: user_id})
     .populate('city_id category_id')
     .sort({"_id": -1})
     .then(data => {
          return res.json(data)
     })

}