const PRODUCT = require('../models/Product')
const CATEGORY = require('../models/Categories')
const ROOM = require('../models/Room')

const getAllProducts = async () => {
  try {
    const product = await PRODUCT.find({})
    return {
      message: 'Successfully get products',
      success: true,
      data: product
    }
  } catch (err) {
    return {
      message: 'An error occurred getProducts',
      success: false
    }
  }
}

const createNewProduct = async (body) => {
  try {

    const existProduct = await PRODUCT.findOne({ Code: body.Code })
    if (existProduct) {
      return {
        message: 'Product already exist',
        success: false,
        data: newProduct
      }
    }

    const newProduct = new PRODUCT(body)
    await newProduct.save()
    return {
      message: 'Successfully create products',
      success: true,
      data: newProduct
    }
  } catch (error) {

    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const getProduct = async (id) => {
  try {
    const product = await PRODUCT.findOne({ _id: id })
    return {
      message: 'Successfully get product',
      success: true,
      data: product
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const getProductByRoom = async (fkRoom) => {
  try {
    const product = await PRODUCT.find({ FK_Room: fkRoom })
    return {
      message: 'Successfully get product',
      success: true,
      data: product
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const getProductByCategory = async (fkCategory) => {
  try {
    const product = await PRODUCT.find({ FK_Category: fkCategory })
    return {
      message: 'Successfully get product',
      success: true,
      data: product
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const updateProduct = async (id, body) => {
  try {

    //const newProduct = new Product(body)
    const existProduct = await PRODUCT.findOne({ _id: id })
    if (!existProduct) {
      return {
        message: 'Product not exist',
        success: false
      }
    }
    await PRODUCT.updateOne({ _id: id }, body)
    return {
      message: 'Successfully update product',
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

const deleteProduct = async (id) => {
  try {
    const existProduct = await PRODUCT.findOne({ _id: id })
    if (!existProduct) {
      return {
        message: 'Product not exist',
        success: false
      }
    }

    await PRODUCT.deleteOne({ _id: id })

    return {
      message: 'Successfully delete product',
      success: true
    }

  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const createNewCategory = async (body) => {
  try {
    const existCategory = await CATEGORY.findOne({ name: body.name })
    if (existCategory) {
      return {
        message: 'Category already exist',
        success: false,
      }
    }

    const newCategory = new CATEGORY(body)
    await newCategory.save()

    return {
      message: 'Successfully create Category',
      success: true,
      data: newCategory
    }
  } catch (error) {
    return {
      message: 'An error occurred createNewCategory',
      success: false
    }
  }
}

const getCategories = async () => {
  try {
    const category = await CATEGORY.find({})
    return {
      message: 'Successfully get products',
      success: true,
      data: category
    }
  } catch (err) {
    return {
      message: 'An error occurred getProducts',
      success: false
    }
  }
}

const updateCategory = async (id, body) => {
  try {
    const existCategory = await CATEGORY.findOne({ _id: id })
    if (!existCategory) {
      return {
        message: 'Category not exist',
        success: false
      }
    }
    await CATEGORY.updateOne({ _id: id }, body)
    return {
      message: 'Successfully update category',
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

const deleteCategory = async (id) => {
  try {
    const existCategory = await CATEGORY.findOne({ _id: id })
    if (!existCategory) {
      return {
        message: 'Category not exist',
        success: false
      }
    }

    await CATEGORY.deleteOne({ _id: id })

    return {
      message: 'Successfully delete category',
      success: true
    }

  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const createNewRoom = async (body) => {
  try {
    const existRoom = await ROOM.findOne({ name: body.name })
    if (existRoom) {
      return {
        message: 'Room already exist',
        success: false,
      }
    }

    const newRoom = new ROOM(body)
    await newRoom.save()

    return {
      message: 'Successfully create Room',
      success: true,
      data: newRoom
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const getRooms = async () => {
  try {
    const room = await ROOM.find({})
    return {
      message: 'Successfully get Room',
      success: true,
      data: room
    }
  } catch (err) {
    return {
      message: 'An error occurred getRooms',
      success: false
    }
  }
}



module.exports = {
  getAllProducts,
  createNewProduct,
  getProduct,
  getProductByRoom,
  getProductByCategory,
  updateProduct,
  deleteProduct,

  createNewCategory,
  getCategories,
  updateCategory,
  deleteCategory,

  createNewRoom,
  getRooms
}