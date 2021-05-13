const express = require('express')
const Controller = require('../controllers/cart.controller')

const router = express.Router()

router.post('/createCart', Controller.createNewCart)

router.put('/updateCart/:id', Controller.updateCart)

router.delete('/deleteCart/:id', Controller.deleteCart)

router.get('/getCart', Controller.getCarts)


module.exports = router