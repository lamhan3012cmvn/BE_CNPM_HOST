const controller = require('./controller');
const billServices = require('../services/bill.services')

const getBill = async (req, res, next) => {
    try {
        const resServices = await billServices.getBill()
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}

const createNewBill = async (req, res, next) => {
    try {
        const resServices = await billServices.createNewBill(req.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }

}


const updateBill = async (req, res, next) => {
    try {
        const { id } = req.params
        const resServices = await billServices.updateBill(id, req.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

const deleteBill = async (req, res, next) => {
    try {
        const { id } = req.params
        const resServices = await billServices.deleteBill(id)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, {}, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

module.exports = {
    getBill,
    createNewBill,
    updateBill,
    deleteBill
}


