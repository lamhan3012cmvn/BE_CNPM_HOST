const express = require('express')
const Controller = require('../controllers/product.controller')
const router = express.Router()

router.post('/createProduct', Controller.createProduct)

router.put('/updateProduct/:_id', Controller.updateProduct)

router.delete('/deleteProduct/:id', Controller.deleteProduct)

router.get('/getProductsByRoom/:FK_Room', Controller.getProductByRoom)

router.get('/getProduct/:id', Controller.getProduct)

router.get('/getProductsByCategory/:FK_Category', Controller.getProductByCategory)

router.get('/getAllProducts', Controller.getAllProducts)


module.exports = router