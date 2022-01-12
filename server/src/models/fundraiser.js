const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Fundraiser Schema
let fundraiserSchema = new Schema({
     user_id: { type: Schema.Types.ObjectId, ref: 'User' },
     city_id: { type: Schema.Types.ObjectId, ref: 'City' },
     category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
     amount: { type: Number, default: '' },
     paid: { type: Number, default: 0 },
     donors: { type: Number, default: 0 },
     image: { type: String, default: ''},
     title: { type: String, default: '' },
     description: { type: String, default: '' },
     isAccepted: { type: Boolean, default: null },
     isFreezed: { type: Boolean, default: false },
     publishDate: { type: Date, default: Date.now },
     // cloudinary_img_id: { type: String, default: ''},
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Fundraiser', fundraiserSchema)