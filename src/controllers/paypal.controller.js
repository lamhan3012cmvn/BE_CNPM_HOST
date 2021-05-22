const controller = require('./controller')
const paypalServices = require('../services/paypal.services')

const payment = async (req, res, next) => {
    try {

        const resServices = await paypalServices.payment(req.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}

const paymentSuccess = async (req, res, next) => {
    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const priceTotal = req.query.total
        const resServices = await paypalServices.PaymentSuccess(payerId, paymentId, priceTotal)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}

const paymentCancel = async (req, res, next) => {
    try {
        const resServices = await paypalServices.PaymentCancel()
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, {}, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}



module.exports = {
    payment,
    paymentSuccess,
    paymentCancel
}