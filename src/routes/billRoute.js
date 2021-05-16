const express = require('express')
const Controller = require('../controllers/bill.controller')
const Validate = require("../validators")
const SchemaValidate = require("../validators/cart.validator")

const router = express.Router()

router.post('/createBill', Validate.body(SchemaValidate.create), Controller.createNewBill)

router.put('/updateBill/:id', Validate.body(SchemaValidate.update), Controller.updateBill)

router.delete('/deleteBill/:id', Controller.deleteBill)

router.get('/getBill', Controller.getBill)


module.exports = router