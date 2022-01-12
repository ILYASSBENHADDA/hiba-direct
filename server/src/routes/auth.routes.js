const express = require('express')
const { register, signIn, logout } = require('../controllers/auth')
const router = express.Router()

// Sign Up User
router.post('/sign-up', register)

// Sign In User
router.post('/sign-in', signIn)

// Sign Out User
router.get('/logout', logout)

// Test
router.post('/test', (req, res) => {
     return res.status(200)
})


module.exports = router