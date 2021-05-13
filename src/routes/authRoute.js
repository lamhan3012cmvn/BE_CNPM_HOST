const express = require('express')
const Controller = require('../controllers/auth.controller')
const SchemaValidate = require("../validators/auth.validator")
const Validate = require("../validators")
const jwtServices = require("../services/jwt.services")
const router = express.Router()


router.get('/getAuth', jwtServices.verify, Controller.getAuth)
router.post('/verify', Validate.body(SchemaValidate.verify), Controller.verify)
// router.get('/getAllUser', Controller.getAllUsers)
router.post('/changePassword', jwtServices.verify, Validate.body(SchemaValidate.changePassword), Controller.changePassword)
router.post('/login', Validate.body(SchemaValidate.login), Controller.login)
router.post('/register', Validate.body(SchemaValidate.register), Controller.register)

module.exports = router