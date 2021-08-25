const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Category Schema
let CategorySchema = new Schema({
     name: { type: String, default: '' },
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Category', CategorySchema)