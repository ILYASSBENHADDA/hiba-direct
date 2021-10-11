const express = require('express')
const { confirmFundraiser, getFundraiserNull, addCity, addCategory, getCity, getCategory, getPayment, freezeFundraiser, deleteFundraiser, statistics, getUser } = require('../controllers/admin')
const router = express.Router()

// Confirm Fundraiser
router.post('/confirm-fundraiser', confirmFundraiser)

// Get Fundraiser Null
router.get('/get-fundraiser-null', getFundraiserNull)

// Stop Fundraiser
router.post('/freeze-fundraiser', freezeFundraiser)

// Delete Fundraiser
router.post('/delete-fundraiser', deleteFundraiser)

// Add City
router.post('/add-city', addCity)

// Get City
router.get('/get-city', getCity)

// Add Category
router.post('/add-category', addCategory)

// Get Category
router.get('/get-category', getCategory)

// Get Payment
router.get('/get-payment', getPayment)

// Get statistics
router.get('/statistics', statistics)

// Get users
router.get('/get-users', getUser)


module.exports = router