require('dotenv').config({ path: './.env' })
require('./src/config/db')

const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { checkUser } = require('./src/middleware/auth')

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json())
const corsOptions = {
     origin: process.env.CLIENT_URI, 
     credentials: true, //access-control-allow-credentials:true
     optionSuccessStatus: 200
}
app.use(cors(corsOptions))

// Routes
app.use('/api', require('./src/routes/auth.routes'))
app.use('/api', require('./src/routes/general.routes'))
app.use('/api', require('./src/routes/admin.routes'))
app.use('/api', require('./src/routes/user.routes'))
app.use('*', checkUser)

module.exports = app