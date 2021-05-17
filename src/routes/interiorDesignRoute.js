const express = require('express')
const Controller = require('../controllers/interiorDesign.controller')
const Validate = require("../validators")
const SchemaValidate = require("../validators/interiorDesign.validator")
const jwtServices = require("../services/jwt.services")

const router = express.Router()

router.post('/createInteriorDesign', jwtServices.verify, Validate.body(SchemaValidate.create), Controller.createNewInteriorDesign)

router.post('/updateInteriorDesign', jwtServices.verify, Validate.body(SchemaValidate.update), Controller.updateInteriorDesign)

router.delete('/deleteInteriorDesign/:id', Controller.deleteInteriorDesign)

router.get('/getInteriorDesign', Controller.getInteriorDesign)


module.exports = router