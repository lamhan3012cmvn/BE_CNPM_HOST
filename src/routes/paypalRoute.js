const express = require('express')
const Controller = require('../controllers/paypal.controller')

const router = express.Router()

router.post('/payment', Controller.payment)

router.get('/success', Controller.paymentSuccess)

router.get('/cancel', Controller.paymentCancel)


module.exports = router