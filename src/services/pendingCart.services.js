const ROOM = require('../models/Room');
const CATEGORY = require('../models/Categories');
const CART = require('../models/Cart');
const PENDINGCART = require('../models/PendingCart');
const PRODUCT = require('../models/Product');
const { defaultStatusPending } = require('../config/default');
const Bill = require('../models/Bill');
const CancelProduct = require('../models/CancelProduct');

const createNewPendingCart = async body => {
	try {
		const idUser = body.idCustomer;
		let resCart = await CART.findOne({ FK_CreateAt: idUser });

		if (!resCart)
			return {
				message: 'Cannot found cart',
				success: false,
			};

		body.products = resCart.products;

		const pendingCart = await PENDINGCART.create(body);
		resCart.products = [];
		await resCart.save();
		return {
			message: 'Successfully create PendingCart',
			success: true,
			data: pendingCart,
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const changeStatusPendingCart = async (idPackage, idCustomer, status) => {
	try {
		const id = idPackage;
		const existPendingCart = await PENDINGCART.findById(id);
		if (existPendingCart && existPendingCart.idCustomer === idCustomer) {
			existPendingCart.status = status;
			await existPendingCart.save();
			if (status === defaultStatusPending.delivered) {
				let prices=0
				const billProduct = await Promise.all(
					existPendingCart.products.map(async p => {
						const newProduct = await PRODUCT.findById(p.idProduct);

						const product = newProduct.toObject();
						const room = await ROOM.findById(product.FK_Room, {
							_id: 0,
							name: 1
						});
						product.FK_Room = room;
						const category = await CATEGORY.findById(product.FK_Category, {
							_id: 0,
							name: 1
						});
						product.FK_Category = category;
						newProduct.Total -= (+p.total);
						newProduct.save();
						prices+=product.Price*(+p.total)
						delete product.isStatus;
						delete product.Total;
						delete product.tags;
						delete product._id;
						delete product.Rate;
						delete product.Heart;
						console.log(product);
						return { total: p.total, product: product} 
					})
				);
				
				const objBill = {
					idCustomer,
					products: billProduct,
					totalPrice:prices
				};
				console.log(billProduct[0])
				const bill = new Bill(objBill);
				await bill.save();
				return {
					message: `Buy product success`,
					success: true
				};
			} else if (status === defaultStatusPending.cancel) {
				let prices=0
				const billProduct = await Promise.all(
					existPendingCart.products.map(async p => {
						const newProduct = await PRODUCT.findById(p.idProduct);
						const product = newProduct.toObject();
						const room = await ROOM.findById(product.FK_Room, {
							_id: 0,
							name: 1
						});
						product.FK_Room = room;
						const category = await CATEGORY.findById(product.FK_Category, {
							_id: 0,
							name: 1
						});
						product.FK_Category = category;
						prices+=product.Price*(+p.total)
						delete product.isStatus;
						delete product.Total;
						delete product.tags;
						delete product._id;
						delete product.Rate;
						delete product.Heart;
						console.log(product);
						return { total: (+p.total), product: product };
					})
				);
					
				const objBill = {
					idCustomer,
					products: billProduct,
					totalPrice:prices
				};
				const cancel = new CancelProduct(objBill);
				await cancel.save();
				return {
					message: `Cancel package success`,
					success: true
				};
			}
			return {
				message: `Success change status to ${status}`,
				success: true
			};
		} else {
			return {
				message: 'Pending Cart not exist',
				success: false
			};
		}
	} catch (error) {
		console.log(error);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const changeStatusAdminPendingCart = async (idPackage, status) => {
	try {
		const id = idPackage;
		const existPendingCart = await PENDINGCART.findById(id);
		if (existPendingCart) {
			existPendingCart.status = status;
			await existPendingCart.save();

			return {
				message: `Success change status to ${status}`,
				success: true
			};
		} else {
			return {
				message: 'Pending Cart not exist',
				success: false
			};
		}
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const getAllPendingCartsByIdCus = async (idCustomer, status) => {
	try {
		const carts = await PENDINGCART.find({
			idCustomer: idCustomer,
			status: { $regex: status, $options: 'i' }
		});

		const newCarts = await Promise.all(
			carts.map(async cart => {
				const objCart = cart.toObject();
				const products = await Promise.all(
					objCart.products.map(async elm => {
						elm.Products = await PRODUCT.findById(elm.idProduct, {
							Image: 1,
							Name: 1,
							_id: 1,
							Price: 1
						});
						return elm;
					})
				);
				objCart.products = products;
				return objCart;
			})
		);

		// const products=await Promise.all(cart.products.map(async elm=>{
		//     elm.Products=await PRODUCT.findById(elm.idProduct,{Image:1,Name:1,_id:1,Price:1})
		//     return elm
		// }))
		return {
			message: 'Successfully get PendingCarts',
			success: true,
			data: newCarts
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const getPendingCartByStatus = async status => {
	try {
		const carts = await PENDINGCART.find({
			status: { $regex: status, $options: 'i' }
		});
		const newCarts = await Promise.all(
			carts.map(async cart => {
				const objCart = cart.toObject();
				const products = await Promise.all(
					objCart.products.map(async elm => {
						elm.Products = await PRODUCT.findById(elm.idProduct, {
							Image: 1,
							Name: 1,
							_id: 1,
							Price: 1
						});
						return elm;
					})
				);
				objCart.products = products;
				return objCart;
			})
		);

		return {
			message: 'Successfully get PendingCarts',
			success: true,
			data: newCarts
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

const updatePendingCart = async (id, body) => {
	try {
		const existPendingCart = await PENDINGCART.findOne({ _id: id });
		if (!existPendingCart) {
			return {
				message: 'PendingCart not exist',
				success: false
			};
		}
		await PENDINGCART.updateOne({ _id: id }, body);
		return {
			message: 'Successfully update PendingCart',
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

const deletePendingCart = async id => {
	try {
		const existPendingCart = await PENDINGCART.findOne({ _id: id });
		if (!existPendingCart) {
			return {
				message: 'PendingCart not exist',
				success: false
			};
		}

		await PENDINGCART.deleteOne({ _id: id });

		return {
			message: 'Successfully delete PendingCart',
			success: true
		};
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

module.exports = {
	createNewPendingCart,
	getAllPendingCartsByIdCus,
	getPendingCartByStatus,
	updatePendingCart,
	deletePendingCart,
	changeStatusPendingCart,
	changeStatusAdminPendingCart
};
