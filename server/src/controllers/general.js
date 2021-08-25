const Fundraiser = require('../models/fundraiser')
const Payment = require('../models/payment')
const jwt = require('jsonwebtoken')
const STRIPE_SECRECT_KEY = process.env.STRIPE_SECRECT_KEY
const stripe = require("stripe")(STRIPE_SECRECT_KEY);
const uuid = require("uuid");


/*
     Payment
*/
exports.payment = (req, res) => {
     const { price, token, fundraiserId } = req.body;
     console.log("PRICE ", price);
     console.log("Token ", token);
     const idempontencyKey = uuid();

     // Get current user
     let user_id
     const userToken = req.cookies.user
     if (userToken) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               user_id = decodedToken.id
          })
     }

     if ( user_id !== null ) {
          return stripe.customers
          .create({
               email: token.email,
               source: token.id
          })
          .then(customer => {
               stripe.charges.create({
                    amount: price * 100,
                    currency: "usd",
                    customer: customer.id,
                    receipt_email: token.email,
                    // description: `purchase of ${product.name}`,
               },
               { idempontencyKey });
               
               // For users logged in
               new Payment({
                    user_id: user_id,
                    amount: price,
                    date: token.created,
               }).save()
               .then(data => {
                    return res.json('Payment regestred success For users logged in')
               })
          })
          // .then(result => res.status(200).json(result))
          .catch(err => console.log(err));
     }

     // If user_id is empty
     else {
          return stripe.customers
          .create({
               email: token.email,
               source: token.id
          })
          .then(customer => {
               stripe.charges.create({
                    amount: price * 100,
                    currency: "usd",
                    customer: customer.id,
                    receipt_email: token.email,
                    // description: `purchase of ${product.name}`,
                    shipping: {
                         name: token.card.name,
                         address: {
                              country: token.card.address_country
                         }
                    }
               },
               { idempontencyKey });

               // For users not logged in
               new Payment({
                    email: token.email,
                    amount: price,
                    date: token.created,
               }).save()
               .then(data => {
                    return res.json('Payment regestred success For users not logged in')
               })
          })
          // .then(result => res.status(200).json(result))
          .catch(err => console.log(err));
     }


     // Update paid & donors
     Fundraiser.findByIdAndUpdate(fundraiserId, {$inc: { paid: price}, $inc: { donors: 1} }).exec()
}


/*
     Get Fundraiser
*/
exports.getFundraiserTrue = (req, res) => {

     Fundraiser.find({isAccepted: true})
     .populate('user_id city_id category_id')
     .sort({"_id": -1})
     .then(data => {
          return res.json(data)
     })

}


/*
     Get Fundraiser Item
*/
exports.getFundraiserItem = (req, res) => {
     const { id } = req.params

     Fundraiser.findById(id)
     .populate('user_id city_id category_id')
     .then(data => {
          return res.json(data)
     })
     // .exec(function(err, data){
     //      if(err) throw err
     //      return res.status(200).send(data)
     // })

}