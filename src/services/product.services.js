const PRODUCT = require('../models/Product')
const CATEGORY = require('../models/Categories')
const ROOM = require('../models/Room')

const getAllProducts = async query => {
	try {
		let perPage = ~~query.limit || 12
		let page = ~~query.page || 1
		let asc = query.asc == 'true' || true
		let bodySort =
			query.sortByName == 'true'
				? {
					Name: 1
				}
				: {
					Price: asc ? 1 : -1
				} || {}
		
		let totalPage=0
		const result = await PRODUCT.find()
		.sort(bodySort)
		.skip(perPage * page - perPage)
		.limit(perPage)
		
		const total=await PRODUCT.countDocuments()
    // console.log(`LHA:  ===> file: product.services.js ===> line 26 ===> total`, total)

		// console.log(`LHA:  ===> file: product.services.js ===> line 21 ===> result`, result)
		
		return {
			message: 'Successfully get products',
			success: true,
			data: {
				products:result,
				pages:Math.ceil(total/perPage),
				total
			}
		}
	} catch (err) {
		console.log(err)
		return {
			message: 'An error occurred getProducts',
			success: false
		}
	}
}

const createNewProduct = async body => {
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

const getProduct = async id => {
	try {
		const resProduct =  await PRODUCT.findById(id)
		if(!resProduct) return {
			message: 'Successfully get product',
			success: true,
			data: {}
		}
		const product=resProduct.toObject()
		const room = await ROOM.findById(product.FK_Room, { _id: 0, name: 1 })
		product.FK_Room = room
		const category = await CATEGORY.findById(product.FK_Category, {
			_id: 0,
			name: 1
		})
		product.FK_Category = category
		return {
			message: 'Successfully get product',
			success: true,
			data: product
		}
	} catch (error) {

	console.log(error)
		return {
			message: 'An error occurred',
			success: false
		}
	}
}

const getProductByRoom = async fkRoom => {
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


const getProductByCategory = async (query) => {
	try {
		let idCategory = query.idCategory
		let perPage = ~~query.limit || 12
		let page = ~~query.page || 1
		let asc = query.asc == 'true' || true
		let bodySort = (query.sortByName == 'true')
			? {
				Name: 1,
			}
			: {
				Price: asc ? 1 : -1,
			} || {}
		const result = await PRODUCT.find({ FK_Category: idCategory })
			.sort(bodySort)
			.skip(perPage * page - perPage)
			.limit(perPage)

		return {
			message: "Successfully get product",
			success: true,
			data: result,
		}
	} catch (error) {
		return {
			message: "An error occurred",
			success: false,
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

const deleteProduct = async id => {
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

const createNewCategory = async body => {
	try {
		const existCategory = await CATEGORY.findOne({ name: body.name })
		if (existCategory) {
			return {
				message: 'Category already exist',
				success: false
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

const deleteCategory = async id => {
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

const createNewRoom = async body => {
	try {
		const existRoom = await ROOM.findOne({ name: body.name })
		if (existRoom) {
			return {
				message: 'Room already exist',
				success: false
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

const getCategoryByRoom = async (id, option) => {
	const category = await CATEGORY.find({ FK_Room: id }, option)
	const newCate = await Promise.all(category.map(async cate => {
		const objCate = cate.toJSON()
		objCate.total = await (await PRODUCT.find({ FK_Category: cate._id })).length
		return objCate
	}))
	return newCate
}

const getFilter = async () => {
	try {
		const room = await ROOM.find({}, {
			_id: 1,
			name: 1
		})
		const newRoom = await Promise.all(
			room.map(async r => {
				const objRoom = r.toJSON()
				objRoom.Category = await getCategoryByRoom(objRoom._id, {
					_id: 1,
					name: 1
				})

				return objRoom
			})
		)

		return {
			message: 'Successfully get Filter',
			success: true,
			data: newRoom
		}
	} catch (err) {
		console.log(err)
		return {
			message: 'An error occurred getFilter',
			success: false
		}
	}
}

const searchProduct = async (searchField) => {
	try {
		console.log(searchField)
		const products = await PRODUCT.find({ tags: { $regex: searchField, $options: '$i' } })
		// .then(data => {
		// 	return {
		// 		message: 'Successfully get Filter',
		// 		success: true,
		// 		data: data
		// 	}
		// })

		//console.log(products)
		return {
			message: 'Successfully search',
			success: true,
			data: products
		}
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		}
	}
}

const filterByPrice = (price) => {
	try {
		console.log(price)
		const products = await PRODUCT.find({ Price: { $regex: price, $options: '$i' } })
		// .then(data => {
		// 	return {
		// 		message: 'Successfully get Filter',
		// 		success: true,
		// 		data: data
		// 	}
		// })

		//console.log(products)
		return {
			message: 'Successfully search',
			success: true,
			data: products
		}
	} catch (error) {
		return {
			message: 'An error occurred',
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
	searchProduct,

	createNewCategory,
	getCategories,
	updateCategory,
	deleteCategory,

	createNewRoom,
	getRooms,
	getFilter
}
