const express = require('express')
const Controller = require('../controllers/cart.controller')
const Validate = require("../validators")
const SchemaValidate = require("../validators/cart.validator")

const router = express.Router()

router.post('/createCart', Validate.body(SchemaValidate.create), Controller.createNewCart)

router.put('/updateCart/:id', Validate.body(SchemaValidate.update), Controller.updateCart)

router.delete('/deleteCart/:id', Controller.deleteCart)

router.get('/getCart', Controller.getCarts)


module.exports = router