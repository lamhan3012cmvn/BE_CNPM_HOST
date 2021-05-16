const controller = require('./controller');
const cartServices = require('../services/cart.services')

const getCarts = async (req, res, next) => {
    try {
        const resServices = await cartServices.getCarts()
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}

const createNewCart = async (req, res, next) => {
    try {
        const resServices = await cartServices.createNewCart(req.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }

}


const updateCart = async (req, res, next) => {
    try {
        const { id } = req.params
        const resServices = await cartServices.updateCart(id, req.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params
        const resServices = await cartServices.deleteCart(id)
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


