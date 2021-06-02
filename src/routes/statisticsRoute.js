const express = require('express')
const Controller = require('../controllers/statistics.controller')

const router = express.Router()

router.get('/rankTenPeopleBill', Controller.getRankTopTenPeopleBill)
router.get('/rankTenProductBill', Controller.getRankTopTenProductBill)
router.get('/rankTenProductCancel', Controller.getRankTopTenProductCancel)


module.exports = router