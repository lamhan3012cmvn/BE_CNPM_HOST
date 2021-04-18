const express = require('express')

const Controller=require('../controllers/auth.controller')
const SchemaValidate=require("../validators/auth.validator")
const Validate=require("../validators")

const router = express.Router()

router.post('/register', Validate.body(SchemaValidate.register) ,Controller.register)

router.post('/login', Validate.body(SchemaValidate.login) ,Controller.login)

module.exports = router