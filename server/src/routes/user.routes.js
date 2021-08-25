const express = require('express')
const { getUserPost } = require('../controllers/user')
const router = express.Router()

// Get current user posts
router.get('/current-post', getUserPost)



module.exports = router