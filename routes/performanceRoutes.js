const express = require('express')

const router = express.Router()
const { createPerformance } = require('../controllers/performanceController')

const { protect } = require('../middleware/authMiddleware')

router.post('/add', protect, createPerformance);


module.exports = router