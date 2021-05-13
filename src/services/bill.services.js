const BILL = require('../models/Cart')


const createNewBill = async body => {
    try {

        const newBill = new BILL(body)
        await newBill.save()

        return {
            message: 'Successfully create bill',
            success: true,
            data: newBill
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const getBill = async () => {
    try {
        const cart = await BILL.find({})
        return {
            message: 'Successfully get bill',
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

const updateBill = async (id, body) => {
    try {
        const existBill = await BILL.findOne({ _id: id })
        if (!existBill) {
            return {
                message: 'Bill not exist',
                success: false
            }
        }
        await BILL.updateOne({ _id: id }, body)
        return {
            message: 'Successfully update bill',
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

const deleteBill = async id => {
    try {
        const existBill = await BILL.findOne({ _id: id })
        if (!existBill) {
            return {
                message: 'Cart not exist',
                success: false
            }
        }

        await BILL.deleteOne({ _id: id })

        return {
            message: 'Successfully delete bill',
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
    createNewBill,
    getBill,
    updateBill,
    deleteBill
}