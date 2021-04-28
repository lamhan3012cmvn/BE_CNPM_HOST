const Product = require('../models/Product')
const CATEGORY =require('../models/Categories')
const ROOM =require('../models/Room')

const getProducts = async () => {
  try {
    const product = await Product.find({})
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
    
    const existProduct = await Product.find({ productId: body.productId })
    if (existProduct) {
      return {
        message: 'Product already exist',
        success: false,
      }
    }
    
    const newProduct = new Product(body)
    await newProduct.save()
    return {
      message: 'Successfully create products',
      success: true,
      data: newProduct
    }
  } catch (error) {
    return {
      message: 'An error occurred createNewProduct',
      success: false
    }
  }
}


const createNewCategory= async (body)=>{
  try{
    const existCategory = await CATEGORY.find({name:body.name})
    if(existCategory)
    {
      return{
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
  }catch(error) {
    return {
      message: 'An error occurred createNewCategory',
      success: false
    }
  }
}

const getCategories = async()=>{
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


const createNewRoom= async (body)=>{
  try{
    const existRom = await ROOM.find({name:body.name})
    if(existRom)
    {
      return{
        message: 'Rom already exist',
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
  }catch(error) {
    return {
      message: 'An error occurred createNewRoom',
      success: false
    }
  }
}

const getRooms = async()=>{
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
  getProducts,
  createNewProduct,

  createNewCategory,
  getCategories,

  createNewRoom,
  getRooms
}