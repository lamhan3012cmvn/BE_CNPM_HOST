const controller = require('./controller')
const roomServices = require('../services/product.services')

const createRoom = async (req, res, next) => {
    try {
        const resServices = await roomServices.createNewRoom(req.body )
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }

}

const getRooms = async (req, res, next) => {
    try {
        const resServices = await roomServices.getRooms()
        controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}

const getSelectRoom = async (req, res, next) => {
    try {
        const resServices = await roomServices.getSelectRooms()
        controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}
module.exports = {
    createRoom,
    getRooms,
    getSelectRoom
}
