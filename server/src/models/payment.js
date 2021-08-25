const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Payment Schema
let PaymentSchema = new Schema({
     fundraiser_id: { type: Schema.Types.ObjectId, ref: 'Fundraiser' },
     user_id: { type: Schema.Types.ObjectId, ref: 'User' },
     email: { type: String },
     amount: { type: Number, default: 0 },
     date: { type: Date, default: Date.now },
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Payment', PaymentSchema)