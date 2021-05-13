const express = require('express')
const Controller = require('../controllers/pendingCart.controller')

const router = express.Router()

router.post('/createPendingCart', Controller.createNewPendingCart)

router.put('/updatePendingCart/:id', Controller.updatePendingCart)

router.delete('/deletePendingCart/:id', Controller.deletePendingCart)

router.get('/getPendingCart', Controller.getPendingCarts)


module.exports = router