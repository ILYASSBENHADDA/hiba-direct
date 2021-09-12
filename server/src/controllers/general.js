const Fundraiser = require('../models/fundraiser')
const Payment = require('../models/payment')
const jwt = require('jsonwebtoken')
const STRIPE_SECRECT_KEY = process.env.STRIPE_SECRECT_KEY
const stripe = require('stripe')(STRIPE_SECRECT_KEY);
// const uuid = require('uuid/v4');


/*
     Payment
*/
exports.payment = async (req, res) => {

     const { price, token, name, fundraiserId } = req.body

     // Get current user
     // let user_id
     // const userToken = req.cookies.user
     // if (userToken) {
     //      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
     //           if (err) throw err
     //           user_id = decodedToken.id
     //      })
     // }


     stripe.charges.create({
          amount: price * 100,
          source: token.id,
          currency: 'usd',
          receipt_email: token.email,
          description: name,
          shipping: {
               name: token.card.name,
               address: {
                    line1: token.card.address_line1,
                    country: token.card.address_country,
                    city: token.card.address_city,
                    postal_code: token.card.address_zip
               }
          }
     })
     .then(() => {

          // Update paid & donors
          const priceInc = Number(price)
          const update = {
               $inc: { paid: priceInc, donors: 1 }
          }
          Fundraiser.findByIdAndUpdate(fundraiserId, update).exec()


          // Register payment
          new Payment({
               fundraiser_id: fundraiserId,
               donor_name: token.card.name,
               email: token.email,
               amount: price,
               date: Date(token.created),
          }).save()
          .then(data => {
               return res.json('Payment regestred success For users logged in')
          })
          

     }).catch((error) => {
          return console.log('Fail Purchase', error)
     })

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
     .exec()
     .then(data => {
          return res.json(data)
     })
     .catch(err => { console.log(err) })
     
     // .exec(function(err, data){
     //      if(err) throw err
     //      return res.status(200).json(data)
     // })

}


/*
     Update Fundraiser
*/
exports.updateFundraiser = (req, res) => {
     const { title, description } = req.body
     const { id } = req.params

     const update = {
          title: title,
          description: description
     }
     Fundraiser.findByIdAndUpdate(id, update)
     .then(() => {
          return res.json({msg: 'Data updated success'})
     })
}