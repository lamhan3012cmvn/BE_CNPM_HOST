const express = require('express')
const productRoute = require('./productRoute')
const authRoute = require('./authRoute')
const categoriesRoute = require('./categoriesRoute')
const roomRoute = require('./roomRoute')
const cartRoute = require('./cartRoute')
const pendingCartRoute = require('./pendingCartRoute')
const billRoute = require('./billRoute')

const router = express.Router()

router.use('/product', productRoute)
router.use('/room', roomRoute)
router.use('/category', categoriesRoute)
router.use('/cart', cartRoute)
router.use('/pendingCart', pendingCartRoute)
router.use('/bill', billRoute)
router.use('/auth', authRoute)

router.get('/info', (req, res) => res.status(200).send('Welcome to server aws'))

module.exports = router