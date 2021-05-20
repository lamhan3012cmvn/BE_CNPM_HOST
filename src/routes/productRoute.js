const express = require('express')
const Controller = require('../controllers/product.controller')
const Validate = require("../validators")
const SchemaValidate = require("../validators/product.validator")
const router = express.Router()

router.post('/createProduct', Controller.createProduct)

router.put('/updateProduct/:_id', Controller.updateProduct)

router.delete('/deleteProduct/:id', Controller.deleteProduct)

router.get('/getProductsByRoom/:FK_Room', Controller.getProductByRoom)

router.get('/getProduct/:id', Controller.getProduct)

router.get('/getAllProducts', Controller.getAllProducts)

router.get('/filter', Controller.getFilter)

router.get('/search', Validate.body(SchemaValidate.search), Controller.searchProduct)

router.get('/filterByPrice', Controller.filterByPrice)

router.get('/getProductsByCategory', Controller.getProductByCategory)



module.exports = router