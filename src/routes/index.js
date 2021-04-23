const express = require('express')
const productRoute = require('./productRoute')
const authRoute = require('./authRoute')
const categoriesRoute = require('./categoriesRoute')
const router = express.Router()

router.use('/product', productRoute)
router.use('/categories', categoriesRoute)
router.use('/auth', authRoute)

module.exports = router