const PENDINGCART = require('../models/PendingCart')


const createNewPendingCart = async body => {
    try {
        const existPendingCart = await PENDINGCART.findOne({ idCustomer: body.idCustomer })
        if (existPendingCart) {
            return {
                message: 'PendingCart already exist',
                success: false
            }
        }

        const newCart = new PENDINGCART(body)
        await newCart.save()

        return {
            message: 'Successfully create PendingCart',
            success: true,
            data: newCart
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const changeStatusPendingCart = async (idCustomer, status) => {
    try {
        const existPendingCart = await PENDINGCART.findOne({ idCustomer: idCustomer })
        if (existPendingCart) {
            existPendingCart.status = status
            await existPendingCart.save()

            return {
                message: `Success change status to ${status}`,
                success: true
            }
        } else {
            return {
                message: 'Pending Cart not exist',
                success: false
            }
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const getPendingCarts = async () => {
    try {
        const cart = await PENDINGCART.find({})
        return {
            message: 'Successfully get PendingCarts',
            success: true,
            data: cart
        }
    } catch (err) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const updatePendingCart = async (id, body) => {
    try {
        const existPendingCart = await PENDINGCART.findOne({ _id: id })
        if (!existPendingCart) {
            return {
                message: 'PendingCart not exist',
                success: false
            }
        }
        await PENDINGCART.updateOne({ _id: id }, body)
        return {
            message: 'Successfully update PendingCart',
            success: true,
            data: body
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const deletePendingCart = async id => {
    try {
        const existPendingCart = await PENDINGCART.findOne({ _id: id })
        if (!existPendingCart) {
            return {
                message: 'PendingCart not exist',
                success: false
            }
        }

        await PENDINGCART.deleteOne({ _id: id })

        return {
            message: 'Successfully delete PendingCart',
            success: true
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}


module.exports = {
    createNewPendingCart,
    getPendingCarts,
    updatePendingCart,
    deletePendingCart,
    changeStatusPendingCart
}