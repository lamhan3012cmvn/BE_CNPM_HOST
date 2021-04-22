const express = require('express')
const Controller = require('../controllers/product.controller')
const router = express.Router()

router.post('/create', Controller.createProduct)

router.get('/getProducts', Controller.getProducts)


module.exports = router