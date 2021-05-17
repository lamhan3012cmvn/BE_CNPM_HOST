const CART = require('../models/Cart')


const createNewCart = async body => {
    try {
        const {decodeToken,total,idProduct} = body
        const existCart = await CART.findOne({ FK_CreateAt:decodeToken.data  })
        if (!existCart) {
            const data={
                products: [{
                    idProduct:idProduct,
                    total:total||1
                }],
                FK_CreateAt: decodeToken.data
            }
            const newCart = new CART(data)
            await newCart.save()
            return {
                message: 'Create Cart Success',
                success: true,
            }
        }else{
            const someProduct=existCart.products.findIndex((elm)=>elm.idProduct===idProduct)
            if(someProduct===-1)
            {
                const product={
                    idProduct:idProduct,
                    total:total||1
                }
                existCart.products.push(product)
            }
            else{
                existCart.products[someProduct].total+=total
            }
            await existCart.save()
            return {
                message: 'Create Cart Success',
                success: true,
            }
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

const updateCart = async (body) => {
console.log(`LHA:  ===> file: cart.services.js ===> line 66 ===> body`, body)
    try {
        const {decodeToken,total,idProduct,status} = body
        console.log(`LHA:  ===> file: cart.services.js ===> line 68 ===> body`, body)
        const existCart = await CART.findOne({ FK_CreateAt:decodeToken.data  })
        console.log(`LHA:  ===> file: cart.services.js ===> line 69 ===> existCart`, existCart)
        if (!existCart) {
            return {
                message: 'Dont find cart update',
                success: false
            }
        }else{
            const someProduct=existCart.products.findIndex((elm)=>elm.idProduct===idProduct)
            console.log(`LHA:  ===> file: cart.services.js ===> line 76 ===> someProduct`, someProduct)
            if(someProduct===-1)
            {
                return {
                    message: 'Dont find product update cart',
                    success: false
                }
            }
            else{
                existCart.products[someProduct].total=total||0
                existCart.products[someProduct].isActive=status||'INACTIVE'
            }
            await existCart.save()
            return {
                message: 'Create Cart Success',
                success: true,
            }
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
    // try {
    //     const existCart = await CART.findOne({ _id: id })
    //     if (!existCart) {
    //         return {
    //             message: 'Cart not exist',
    //             success: false
    //         }
    //     }
    //     await CART.updateOne({ _id: id }, body)
    //     return {
    //         message: 'Successfully update cart',
    //         success: true,
    //         data: body
    //     }
    // } catch (error) {
    //     return {
    //         message: 'An error occurred',
    //         success: false
    //     }
    // }
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