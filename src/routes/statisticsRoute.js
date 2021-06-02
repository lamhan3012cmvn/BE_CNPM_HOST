const express = require('express')
const Controller = require('../controllers/statistics.controller')

const router = express.Router()

router.get('/rankTenPeopleBill', Controller.getRankTopTenPeopleBill)

module.exports = router