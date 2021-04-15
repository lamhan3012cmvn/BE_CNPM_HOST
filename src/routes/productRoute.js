const express = require('express')
const Product = require('../models/Product')



const router = express.Router()

router.get('/product/getData', async (req, res) => {
    let product = await Product.find({})

    res.send(product)

})

module.exports = router