const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User Schema
let UserSchema = new Schema({
     first_name: { type: String, default: '' },
     last_name: { type: String, default: '' },
     email: { type: String, default: '' },
     role: { type: String, default: 'user' },
     password: { type: String, default: '' },
},
{ 
     versionKey: false
})


module.exports = mongoose.model('User', UserSchema)