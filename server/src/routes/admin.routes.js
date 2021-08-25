const express = require('express')
const { confirmFundraiser, getFundraiserNull, addCity, addCategory, getCity, getCategory } = require('../controllers/admin')
const router = express.Router()

// Confirm Fundraiser
router.post('/confirm-fundraiser', confirmFundraiser)

// Get Fundraiser Null
router.get('/get-fundraiser-null', getFundraiserNull)

// Add City
router.post('/add-city', addCity)

// Get City
router.get('/get-city', getCity)

// Add Category
router.post('/add-category', addCategory)

// Get Category
router.get('/get-category', getCategory)


module.exports = router