const Fundraiser = require('../models/fundraiser')
const City = require('../models/city')
const Category = require('../models/category')
const Payment = require('../models/payment')


/*
     Confirm Fundraiser
*/
exports.confirmFundraiser = (req, res) => {
     const { id, confirmation } = req.body

     console.log(id, confirmation)

     if (confirmation) {
          Fundraiser.findByIdAndUpdate(id, {isAccepted: true})
          .then(data => {
               return res.json({msg: 'Fundraising is accepted'})
          })
     } 
     else {
          Fundraiser.findByIdAndUpdate(id, {isAccepted: false})
          .then(data => {
               return res.json({msg: 'Fundraising is refused'})
          })
     }
     
}


/*
     Get Fundraiser sill not confirmed
*/
exports.getFundraiserNull = (req, res) => {

     Fundraiser.find({isAccepted: null})
     .populate('user_id city_id category_id')
     .sort({"_id": -1})
     .then(data => {
          return res.json(data)
     })

}



/*
     Add new city
*/
exports.addCity = (req, res) => {
     const { name } = req.body

     new City({
          name: name
     }).save()
     .then(data => {
          return res.json(data)
     })

}


/*
     Get city
*/
exports.getCity = (req, res) => {
     
     City.find()
     .then(data => {
          return res.json(data)
     })

}


/*
     Add new category
*/
exports.addCategory = (req, res) => {
     const { name } = req.body

     new Category({
          name: name
     }).save()
     .then(data => {
          return res.json(data)
     })

}


/*
     Get category
*/
exports.getCategory = (req, res) => {
     
     Category.find()
     .then(data => {
          return res.json(data)
     })

}


/*
     Get payment
*/
exports.getPayment = (req, res) => {
     
     Payment.find()
     .then(data => {
          return res.json(data)
     })

}


