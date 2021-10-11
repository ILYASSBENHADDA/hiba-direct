const Users = require('../models/user')
const Fundraiser = require('../models/fundraiser')
const City = require('../models/city')
const Category = require('../models/category')
const Payment = require('../models/payment')
const cloudinary = require("../utils/cloudinary");


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
     .sort({"_id": -1})
     .then(data => {
          return res.json(data)
     })

}


/*
     Freeze the fundraisier
*/
exports.freezeFundraiser = (req, res) => {
     const { id, boolean } = req.body
     let update;

     if ( boolean === false ) {
          update = {
               isFreezed: true
          }
     }

     if ( boolean === true ) {
          update = {
               isFreezed: false
          }
     }
     
     
     Fundraiser.findByIdAndUpdate(id, update)
     .then(() => {
          if ( boolean === false ) {
               return res.json({msg: 'Fundraising freezed success'})
          }
     
          if ( boolean === true ) {
               return res.json({msg: 'Fundraising Defrost success'})
          }
          
     })

}


/*
     Delete the fundraisier
*/
exports.deleteFundraiser = async (req, res) => {
     const { id } = req.body

     try {
          const fund = await Fundraiser.findById(id) 

          await cloudinary.uploader.destroy(fund.cloudinary_img_id)
     } catch (error) {
          console.log(error)
     }
     

     Fundraiser.findByIdAndRemove(id)
     .then(() => {
          return res.json({msg: 'Fundraiser deleted success'})
     })

}


/*
     Statistics
*/
exports.statistics = async (req, res) => {

     // Users count
     const UsersCount = await Users.find().countDocuments()

     // Total Paid for all fundraiser
     const PaidCount = await Fundraiser.aggregate([
          // {$match: {}},
          { $group: { _id: "totalDonated", paid: {$sum: "$paid"}} }
     ])

     const PaidXCount = PaidCount[0].paid

     // Total fundraiser approved
     const fundraiserApprovedCount = await Fundraiser.find({isAccepted: true}).countDocuments()

     // Total fundraiser pending
     const fundraiserPendingCount = await Fundraiser.find({isAccepted: null}).countDocuments()

     return res.json({UsersCount, PaidXCount, fundraiserApprovedCount, fundraiserPendingCount})     
}


/*
     Get user
*/
exports.getUser = (req, res) => {
     
     Users.find()
     .sort({"_id": -1})
     .then(data => {
          return res.json(data)
     })

}