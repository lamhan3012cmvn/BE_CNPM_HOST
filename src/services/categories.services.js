const CATEGORIES = require('../models/Categories')

const getCategories = async () => {
    try {
        const categories = await CATEGORIES.find({})
        return {
            message: 'Successfully get categories',
            success: true,
            data: categories
        }
    } catch (err) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const createNewCategories = async (body) => {
    try {
        const newCategories = new CATEGORIES(body)

        const existCategories = await CATEGORIES.findOne({ categoriesId: body.categoriesId })
        if (existCategories) {
            return {
                message: 'Categories already exist',
                success: false,
                data: newCategories
            }
        }

        await newCategories.save()
        return {
            message: 'Successfully create Categories',
            success: true,
            data: newCategories
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

module.exports = {
    getCategories,
    createNewCategories
}