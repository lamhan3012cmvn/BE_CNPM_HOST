const express = require('express')
const Controller = require('../controllers/pendingCart.controller')
const Validate = require("../validators")
const SchemaValidate = require("../validators/cart.validator")
const jwtServices = require("../services/jwt.services")
const router = express.Router()

router.post('/createPendingCart', jwtServices.verify, Controller.createNewPendingCart)

router.post('/changeStatus', jwtServices.verify, Controller.changeStatusPendingCart)

router.put('/updatePendingCart/:id', jwtServices.verify, Validate.body(SchemaValidate.update), Controller.updatePendingCart)

router.delete('/deletePendingCart/:id', jwtServices.verify, Controller.deletePendingCart)

router.get('/getPendingCart', jwtServices.verify, Controller.getPendingCarts)


module.exports = router