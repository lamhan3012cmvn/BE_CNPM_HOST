const express = require('express')
const Controller=require('../controllers/product.controller')
const router = express.Router()

router.get('/product/getData', Controller.getProducts)

module.exports = router