const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Blog Schema
let BlogSchema = new Schema({
     title: { type: String, default: '' },
     description: { type: String, default: '' },
     image: { type: String, default: '' },
     video: { type: String, default: '' },
     author: { type: String, default: '' },
     date: { type: Date, default: Date.now },

},
{ 
     versionKey: false
})


module.exports = mongoose.model('Blog', BlogSchema)