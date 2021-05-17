const express = require('express')
const Controller = require('../controllers/cart.controller')
const Validate = require("../validators")
const SchemaValidate = require("../validators/cart.validator")
const jwtServices = require("../services/jwt.services")

const router = express.Router()

router.post('/createCart', jwtServices.verify, Validate.body(SchemaValidate.create), Controller.createNewCart)

router.post('/updateCart', jwtServices.verify, Validate.body(SchemaValidate.update), Controller.updateCart)

router.delete('/deleteCart/:id', Controller.deleteCart)

router.get('/getCart', Controller.getCarts)


module.exports = router