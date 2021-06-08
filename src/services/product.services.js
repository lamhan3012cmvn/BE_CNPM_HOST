const PRODUCT = require('../models/Product');
const CATEGORY = require('../models/Categories');
const ROOM = require('../models/Room');
const { promises } = require('stream');
const User = require('../models/User');
const TypeInteriorDesign=require('../models/TypeInteriorDesign')
const InteriorDesign=require('../models/InteriorDesign')

const getAllProducts = async query => {
	try {
		let perPage = ~~query.limit || 12;
		let page = ~~query.page || 1;
		// let asc = query.asc == 'true' || true
		let strSearch = removeVietnameseTones(query.search || '');
		let idCategory = query.idCategory || '';
		// let bodySort =
		// 	(query.sortByName == 'true')
		// 		? {
		// 			Name: 1
		// 		}
		// 		: {
		// 			Price: asc ? 1 : -1
		// 		} || {}s
		const result = await PRODUCT.find({
			tags: { $regex: strSearch, $options: '$i' },
			FK_Category: { $regex: idCategory, $options: '$i' }
		})
			.sort({ Heart: -1 })
			.skip(perPage * page - perPage)
			.limit(perPage);

		const total = await PRODUCT.countDocuments({
			tags: { $regex: strSearch, $options: '$i' },
			FK_Category: { $regex: idCategory, $options: '$i' }
		});
		const resData = {
			products: result,
			pages: Math.ceil(total / perPage),
			total
		};
		return {
			message: 'Successfully get products',
			success: true,
			data: resData
		};
	} catch (err) {
		return {
			message: 'An error occurred getProducts',
			success: false
		};
	}
};

const createNewProduct = async body => {
	try {
		const existProduct = await PRODUCT.findOne({ Code: body.Code });
		if (existProduct) {
			return {
				message: 'Product already exist',
				success: false,
			};
		}

		const newProduct = new PRODUCT(body);
		await newProduct.save();
		return {
			message: 'Successfully create products',
			success: true,
			data: newProduct
		};
	} catch (error) {
		console.log(error)
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const getProduct = async id => {
	try {
		const resProduct = await PRODUCT.findById(id);
		if (!resProduct)
			return {
				message: 'Successfully get product',
				success: true,
				data: {}
			};
		const product = resProduct.toObject();
		const room = await ROOM.findById(product.FK_Room, { _id: 0, name: 1 });
		product.FK_Room = room;
		const category = await CATEGORY.findById(product.FK_Category, {
			_id: 0,
			name: 1
		});
		product.FK_Category = category;
		const newP=await Promise.all(product.Rate.map(async (r)=>{
			const newR=await Promise.all(r.comment.map(async c=>{
				c.current=await User.findById(c.current,{id:1,fullName:1,avatar:1})
				return c
			}))
			return newR
		}))
		console.log(newP)
		return {
			message: 'Successfully get product',
			success: true,
			data: product
		};
	} catch (error) {
		console.log(error)
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const getProductRoom = async () => {
	try {
		let perPage = 24;
		let page = 1;

		const interior=await InteriorDesign.find({},{_id:1,Images:1,title:1,FK_TypeInteriorDesign:1}).limit(4);

		const newInterior=await Promise.all(interior.map(async iter=>{
			const typeInter=await TypeInteriorDesign.findById(iter.FK_TypeInteriorDesign,{_id:1,name:1})
			const newInter=JSON.parse(JSON.stringify(iter));
			newInter.TypeInteriorDesign=typeInter
			return newInter
		}))
		const awesome = await PRODUCT.find(
			{},
			{ _id: 1, Image: 1, Name: 1, Price: 1 }
		)
			.sort({ Heart: -1 })
			.skip(perPage * page - perPage)
			.limit(perPage);
		const results = [
			{
				roomName: 'Awesome',
				products: awesome
			}
		];
		const rooms = await ROOM.find({}, { _id: 1, name: 1 });
		const resultRoom = await Promise.all(
			rooms.map(async room => {
				const productByRoom = await PRODUCT.find(
					{ FK_Room: room._id },
					{ _id: 1, Image: 1, Name: 1, Price: 1 }
				);
				return {
					roomName: room.name,
					products: productByRoom
				};
			})
		);
		results.push(...resultRoom);

		return {
			message: 'Successfully get product Home Page',
			success: true,
			data: {
				inter:newInterior,
				product:results
			}
		};
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const getProductByCategory = async query => {
	try {
		let idCategory = query.idCategory;
		let perPage = ~~query.limit || 12;
		let page = ~~query.page || 1;
		let asc = query.asc == 'true' || true;
		let bodySort =
			query.sortByName == 'true'
				? {
						Name: 1
				  }
				: {
						Price: asc ? 1 : -1
				  } || {};
		const result = await PRODUCT.find({ FK_Category: idCategory })
			.sort(bodySort)
			.skip(perPage * page - perPage)
			.limit(perPage);

		return {
			message: 'Successfully get product',
			success: true,
			data: result
		};
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const updateProduct = async (id, body) => {
	try {
		//const newProduct = new Product(body)
		const existProduct = await PRODUCT.findOne({ _id: id });
		if (!existProduct) {
			return {
				message: 'Product not exist',
				success: false
			};
		}
		await PRODUCT.updateOne({ _id: id }, body);
		return {
			message: 'Successfully update product',
			success: true,
			data: body
		};
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const deleteProduct = async id => {
	try {
		const existProduct = await PRODUCT.findOne({ _id: id });
		if (!existProduct) {
			return {
				message: 'Product not exist',
				success: false
			};
		}

		await PRODUCT.deleteOne({ _id: id });

		return {
			message: 'Successfully delete product',
			success: true
		};
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const createNewCategory = async body => {
	try {
		const existCategory = await CATEGORY.findOne({ name: body.name });
		if (existCategory) {
			return {
				message: 'Category already exist',
				success: false
			};
		}

		const newCategory = new CATEGORY(body);
		await newCategory.save();

		return {
			message: 'Successfully create Category',
			success: true,
			data: newCategory
		};
	} catch (error) {
		return {
			message: 'An error occurred createNewCategory',
			success: false
		};
	}
};

const getCategories = async () => {
	try {
		const category = await CATEGORY.find(
			{},
			{ _id: 1, name: 1, createdAt: 1, FK_Room: 1 }
		);
		const objCate = await Promise.all(
			category.map(async elm => {
				const obj = elm.toObject();
				obj.FK_Room = await ROOM.findById(obj.FK_Room, {
					_id: 1,
					name: 1,
					createdAt: 1
				});
				return obj;
			})
		);
		return {
			message: 'Successfully get products',
			success: true,
			data: objCate
		};
	} catch (err) {
		return {
			message: 'An error occurred getProducts',
			success: false
		};
	}
};
const getSelectCategoryByRoom = async id => {
	try {
		const category = await CATEGORY.find({ FK_Room: id }, { _id: 1, name: 1 });
		return {
			message: 'Successfully get category select',
			success: true,
			data: category
		};
	} catch (err) {
		return {
			message: 'An error occurred getProducts',
			success: false
		};
	}
};

const updateCategory = async (id, body) => {
	try {
		const existCategory = await CATEGORY.findOne({ _id: id });
		if (!existCategory) {
			return {
				message: 'Category not exist',
				success: false
			};
		}
		await CATEGORY.updateOne({ _id: id }, body);
		return {
			message: 'Successfully update category',
			success: true,
			data: body
		};
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const deleteCategory = async id => {
	try {
		const existCategory = await CATEGORY.findOne({ _id: id });
		if (!existCategory) {
			return {
				message: 'Category not exist',
				success: false
			};
		}

		await CATEGORY.deleteOne({ _id: id });

		return {
			message: 'Successfully delete category',
			success: true
		};
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const createNewRoom = async body => {
	try {
		const existRoom = await ROOM.findOne({ name: body.name });
		if (existRoom) {
			return {
				message: 'Room already exist',
				success: false
			};
		}

		const newRoom = new ROOM(body);
		await newRoom.save();

		return {
			message: 'Successfully create Room',
			success: true,
			data: newRoom
		};
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const getRooms = async () => {
	try {
		const room = await ROOM.find({});
		return {
			message: 'Successfully get Room',
			success: true,
			data: room
		};
	} catch (err) {
		return {
			message: 'An error occurred getRooms',
			success: false
		};
	}
};

const getSelectRooms = async () => {
	try {
		const room = await ROOM.find({}, { _id: 1, name: 1 });
		return {
			message: 'Successfully get Room',
			success: true,
			data: room
		};
	} catch (err) {
		return {
			message: 'An error occurred getRooms',
			success: false
		};
	}
};

const getCategoryByRoom = async (id, option) => {
	const category = await CATEGORY.find({ FK_Room: id }, option);
	const newCate = await Promise.all(
		category.map(async cate => {
			const objCate = cate.toJSON();
			objCate.total = await (
				await PRODUCT.find({ FK_Category: cate._id })
			).length;
			return objCate;
		})
	);
	return newCate;
};

const getFilter = async () => {
	try {
		const room = await ROOM.find(
			{},
			{
				_id: 1,
				name: 1
			}
		);
		const newRoom = await Promise.all(
			room.map(async r => {
				const objRoom = r.toJSON();
				objRoom.CateSelectgory = await getCategoryByRoom(objRoom._id, {
					_id: 1,
					name: 1
				});

				return objRoom;
			})
		);

		return {
			message: 'Successfully get Filter',
			success: true,
			data: newRoom
		};
	} catch (err) {
		return {
			message: 'An error occurred getFilter',
			success: false
		};
	}
};

function removeVietnameseTones(str) {
	let newStr = str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'D');

	return newStr;
}

const searchProduct = async searchField => {
	try {
		const newSearch = removeVietnameseTones('');

		const products = await PRODUCT.find({
			tags: { $regex: newSearch, $options: '$i' }
		});
		// .then(data => {
		// 	return {
		// 		message: 'Successfully get Filter',
		// 		success: true,
		// 		data: data
		// 	}
		// })

		return {
			message: 'Successfully search',
			success: true,
			data: products
		};
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const filterByPrice = async price => {
	try {
		const priceMax = parseInt(price, 10);
		const products = await PRODUCT.find({ Price: { $lte: priceMax } });

		return {
			message: 'Successfully filter Price',
			success: true,
			data: products
		};
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const rateProduct = async ({ idProduct, value, content, idUser }) => {
	try{
		const product = await PRODUCT.findById(idProduct);
	const rate = {
		value,
		comment: [{ current: idUser, content: content }]
	};
	product.Rate.push(rate)
	const resProduct= await product.save()
	if(resProduct)
	{

		const currentProduct=await getProduct(idProduct)
		if(currentProduct.success)
		{
			return {
				message: 'Successfully filter Price',
				success: true,
				data: currentProduct
			};
		}
		return {
			message: 'Get single Product fail',
			success: false,
			data: {}
		};
	}
	return {
		message: 'Sorry Comment Product',
		success: false,
		data: products
	};
	}catch(err){
		console.log(err)
		return {
			message: 'An error occurred',
			success: false
		};
	}
	

};

module.exports = {
	rateProduct,
	getAllProducts,
	createNewProduct,
	getProduct,
	getProductRoom,
	getProductByCategory,
	updateProduct,
	deleteProduct,
	searchProduct,
	filterByPrice,

	createNewCategory,
	getCategories,
	updateCategory,
	deleteCategory,

	createNewRoom,
	getRooms,
	getFilter,

	getSelectCategoryByRoom,
	getSelectRooms
};
