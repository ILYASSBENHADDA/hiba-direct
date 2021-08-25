const mongoose = require('mongoose')
const Schema = mongoose.Schema

// City Schema
let CitySchema = new Schema({
     name: { type: String, default: '' },
},
{ 
     versionKey: false
})


module.exports = mongoose.model('City', CitySchema)