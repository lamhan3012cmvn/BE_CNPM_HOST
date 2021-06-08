const controller = require('./controller')
const cartServices = require('../services/cart.services')

const getCarts = async (req, res, next) => {
    try {
        const resServices = await cartServices.getCarts(req.value.body)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}

const createNewCart = async (req, res, next) => {
    try {
        const resServices = await cartServices.createNewCart(req.value.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }

}


const updateCart = async (req, res, next) => {
    try {
        const resServices = await cartServices.updateCart(req.value.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const resServices = await cartServices.deleteCart(req.value.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, {}, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

module.exports = {
    getCarts,
    createNewCart,
    updateCart,
    deleteCart
}


