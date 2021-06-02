const Bill = require('../models/Bill');
const CancelProduct = require('../models/CancelProduct');
const USER = require('../models/User');

module.exports.rankTopTenPeopleBill = async () => {
	try {
		const currentDate = new Date();
		console.log(currentDate.getFullYear());
		const startDate = new Date(`${currentDate.getFullYear()}/01/01`);
		const endDate = new Date(`${currentDate.getFullYear()}/12/31`);
		const rankTop = await Bill.aggregate([
			{
				$match: { createdAt: { $gt: startDate, $lt: endDate } }
			}
		])
			.group({
				_id: '$idCustomer',
				totalPrice: {
					$sum: '$totalPrice'
				}
			})
			.sort({ totalPrice: -1 })
			.limit(10);
		const newRank = await Promise.all(
			rankTop.map(async (r, i) => {
				const user = await USER.findById(r._id, { id: 1, fullName: 1 });
				return {
					key: i + 1,
					id: user._id,
					name: user.fullName,
					totalPrice: r.totalPrice
				};
			})
		);
		return {
			success: true,
			message: 'Successfully get rank top ten people',
			data: newRank
		};
	} catch (err) {
		console.log(err);
		return {
			success: false,
			message: 'Fail get rank top ten people'
		};
	}
};

module.exports.rankTopTenProductBill = async () => {
	try {
		const currentDate = new Date();
		console.log(currentDate.getFullYear());
		const startDate = new Date(`${currentDate.getFullYear()}/01/01`);
		const endDate = new Date(`${currentDate.getFullYear()}/12/31`);
		const rankTop = await Bill.aggregate([
			{
				$match: { createdAt: { $gt: startDate, $lt: endDate } }
			},
			{ $project: { _id: 0, products: 1 } },
			{ $unwind: '$products' },
			{ $group: { _id: '$products', tags: { $sum: '$products.total' } } },
			{ $project: { _id: 0, products: '$_id', tags: 1 } },
			{
				$group: {
					_id: {
						code: '$products.product.Code',
						name: '$products.product.Name',
						image: '$products.product.Image'
					},
					tags: { $sum: '$tags' }
				}
			},
			{ $project: { _id: 0, products: '$_id', tags: 1 } }
		])
			.sort({ tags: -1 })
			.limit(10);
		return {
			success: true,
			message: 'Successfully get rank top ten people',
			data: rankTop
		};
	} catch (err) {
		console.log(err);
		return {
			success: false,
			message: 'Fail get rank top ten people'
		};
	}
};
module.exports.rankTopTenProductCancel = async () => {
	try {
		const currentDate = new Date();
		console.log(currentDate.getFullYear());
		const startDate = new Date(`${currentDate.getFullYear()}/01/01`);
		const endDate = new Date(`${currentDate.getFullYear()}/12/31`);
		const rankTop = await CancelProduct.aggregate([
			{
				$match: { createdAt: { $gt: startDate, $lt: endDate } }
			},
			{ $project: { _id: 0, products: 1 } },
			{ $unwind: '$products' },
			{ $group: { _id: '$products', tags: { $sum: '$products.total' } } },
			{ $project: { _id: 0, products: '$_id', tags: 1 } },
			{
				$group: {
					_id: {
						code: '$products.product.Code',
						name: '$products.product.Name',
						image: '$products.product.Image'
					},
					tags: { $sum: '$tags' }
				}
			},
			{ $project: { _id: 0, products: '$_id', tags: 1 } }
		])
			.sort({ tags: -1 })
			.limit(10);
		return {
			success: true,
			message: 'Successfully get rank top ten product canceled',
			data: rankTop
		};
	} catch (err) {
		console.log(err);
		return {
			success: false,
			message: 'Fail get rank top ten people'
		};
	}
};
