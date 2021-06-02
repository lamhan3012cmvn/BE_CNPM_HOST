        
const controller = require('./controller');
const pendingCartServices = require('../services/pendingCart.services')

const getPendingCartsByStatus = async (req, res, next) => {
    try {
        const { status } = req.query
        const resServices = await pendingCartServices.getPendingCartByStatus(status)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        console.log(err)
        return controller.sendError(res)
    }
}

const getPendingCartsByIdCus = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body
        const { status } = req.query
        const idCustomer = decodeToken.data
        const resServices = await pendingCartServices.getAllPendingCartsByIdCus(idCustomer, status)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}

const createNewPendingCart = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
        const pendingCart = req.value.body;
        console.log(pendingCart);
        const idCustomer = decodeToken.data;
        pendingCart.idCustomer = idCustomer;
        console.log(pendingCart);
        const resServices = await pendingCartServices.createNewPendingCart(pendingCart);
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

const changeStatusPendingCart = async (req, res, next) => {
    try {
        const { decodeToken,idPackage ,status} = req.value.body
        const idCustomer = decodeToken.data
        const resServices = await pendingCartServices.changeStatusPendingCart(idPackage,idCustomer, status)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, {}, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

const changeStatusAdminPendingCart = async (req, res, next) => {
    try {
        const { idPackage ,status} = req.value.body
        const resServices = await pendingCartServices.changeStatusAdminPendingCart(idPackage, status)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, {}, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

const updatePendingCart = async (req, res, next) => {
    try {
        const { id } = req.params
        const resServices = await pendingCartServices.updatePendingCart(id, req.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

const deletePendingCart = async (req, res, next) => {
    try {
        const { id } = req.params
        const resServices = await pendingCartServices.deletePendingCart(id)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, {}, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

module.exports = {
    getPendingCartsByStatus,
    getPendingCartsByIdCus,
    createNewPendingCart,
    updatePendingCart,
    deletePendingCart,
    changeStatusPendingCart,
    changeStatusAdminPendingCart
}


