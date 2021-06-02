const express = require('express')
const Controller = require('../controllers/pendingCart.controller')
const Validate = require("../validators")
const SchemaValidate = require("../validators/pending.validator")
const jwtServices = require("../services/jwt.services")
const router = express.Router()

router.post('/createPendingCart', jwtServices.verify, Validate.body(SchemaValidate.createPending), Controller.createNewPendingCart)

router.post('/changeStatus',jwtServices.verify,Validate.body(SchemaValidate.changeStatus) , Controller.changeStatusPendingCart)

router.post('/admin/changeStatus',jwtServices.verify,Validate.body(SchemaValidate.changeStatus) , Controller.changeStatusAdminPendingCart)

router.put('/updatePendingCart/:id', jwtServices.verify, Validate.body(SchemaValidate.update), Controller.updatePendingCart)

router.delete('/deletePendingCart/:id', jwtServices.verify, Controller.deletePendingCart)

router.get('/admin/getPendingCart', jwtServices.verify, Controller.getPendingCartsByStatus)

router.get('/customer/getPendingCart', jwtServices.verify, Controller.getPendingCartsByIdCus)


module.exports = router