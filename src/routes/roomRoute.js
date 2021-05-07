const express = require('express')
const Controller = require('../controllers/room.controller')

const router = express.Router()

router.post('/createRoom', Controller.createRoom)

router.get('/getRooms', Controller.getRooms)


module.exports = router