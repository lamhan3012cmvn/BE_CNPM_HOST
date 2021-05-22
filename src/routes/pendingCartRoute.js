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

router.post('/admin/getPendingCart', jwtServices.verify, Controller.getPendingCartsByStatus)

router.post('/customer/getPendingCart', jwtServices.verify, Controller.getPendingCartsByIdCus)


module.exports = router