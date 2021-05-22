const CART = require('../models/Cart')
const PENDINGCART = require('../models/PendingCart')
const PRODUCT = require('../models/Product')
const USER =require('../models/User')

const createNewPendingCart = async body => {
    try {
        const id=body.idCustomer.decodeToken.data
        const resCart= await CART.findOne({FK_CreateAt:id})
        
        if(!resCart)
        return {
            message: 'Dont find Cart by User',
            success: false,
        }
        
        
        const data={
            idCustomer:id,
            products:resCart.products
        }

        const newCart = new PENDINGCART(data)
        await newCart.save()

        resCart.products.length=0
        await resCart.save()
        
        return {
            message: 'Successfully create PendingCart',
            success: true,
        }
    } catch (error) {
        console.log(error)
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

const getAllPendingCartsByIdCus = async (idCustomer, status) => {
    try {
        const cart = await PENDINGCART.find({ idCustomer: idCustomer, status: status })
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

const getPendingCartByStatus = async (status) => {
    try {
        const carts = await PENDINGCART.find({ status: status })
        const newCarts=await Promise.all(carts.map(async cart=>{
            const objCart=cart.toObject()
            console.log(`LHA:  ===> file: pendingCart.services.js ===> line 89 ===> objCart`, objCart)
            const products=await Promise.all(objCart.products.map(async elm=>{
            
                
                elm.Products=await PRODUCT.findById(elm.idProduct,{Image:1,Name:1,_id:1,Price:1})
                return elm
            }))
            objCart.products=products
            return objCart
        }))
        
        return {
            message: 'Successfully get PendingCarts',
            success: true,
            data: newCarts
        }
    } catch (err) {
        console.log(err)
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
    getAllPendingCartsByIdCus,
    getPendingCartByStatus,
    updatePendingCart,
    deletePendingCart,
    changeStatusPendingCart
}