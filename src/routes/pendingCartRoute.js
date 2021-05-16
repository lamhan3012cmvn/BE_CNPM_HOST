const express = require('express')
const Controller = require('../controllers/pendingCart.controller')
const Validate = require("../validators")
const SchemaValidate = require("../validators/cart.validator")

const router = express.Router()

router.post('/createPendingCart', Validate.body(SchemaValidate.create), Controller.createNewPendingCart)

router.put('/updatePendingCart/:id', Validate.body(SchemaValidate.update), Controller.updatePendingCart)

router.delete('/deletePendingCart/:id', Controller.deletePendingCart)

router.get('/getPendingCart', Controller.getPendingCarts)


module.exports = router