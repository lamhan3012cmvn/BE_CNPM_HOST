const CART = require('../models/Cart')


const createNewCart = async body => {
    try {
        const existCart = await CART.findOne({ idCustomer: body.idCustomer })
        if (existCart) {
            return {
                message: 'Cart already exist',
                success: false
            }
        }

        const newCart = new CART(body)
        await newCart.save()

        return {
            message: 'Successfully create Cart',
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

const getCarts = async () => {
    try {
        const cart = await CART.find({})
        return {
            message: 'Successfully get carts',
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

const updateCart = async (id, body) => {
    try {
        const existCart = await CART.findOne({ _id: id })
        if (!existCart) {
            return {
                message: 'Cart not exist',
                success: false
            }
        }
        await CART.updateOne({ _id: id }, body)
        return {
            message: 'Successfully update cart',
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

const deleteCart = async id => {
    try {
        const existCategory = await CART.findOne({ _id: id })
        if (!existCategory) {
            return {
                message: 'Cart not exist',
                success: false
            }
        }

        await CART.deleteOne({ _id: id })

        return {
            message: 'Successfully delete cart',
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
    createNewCart,
    getCarts,
    updateCart,
    deleteCart
}