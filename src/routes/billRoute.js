const express = require('express')
const Controller = require('../controllers/bill.controller')

const router = express.Router()

router.post('/createBill', Controller.createNewBill)

router.put('/updateBill/:id', Controller.updateBill)

router.delete('/deleteBill/:id', Controller.deleteBill)

router.get('/getBill', Controller.getBill)


module.exports = router