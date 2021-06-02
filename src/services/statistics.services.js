const Bill = require('../models/Bill');
const USER = require('../models/User');
module.exports.rankTopTenPeopleBill = async () => {
	try {
		const currentDate = new Date();
		console.log(currentDate.getFullYear());
		const startDate = new Date(`${currentDate.getFullYear()}/01/01`);
		console.log(
			`LHA:  ===> file: statistics.services.js ===> line 7 ===> startDate`,
			startDate
		);
		const endDate = new Date(`${currentDate.getFullYear()}/12/31`);
		console.log(
			`LHA:  ===> file: statistics.services.js ===> line 9 ===> endDate`,
			endDate
		);
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
			rankTop.map(async r => {
				const user = await USER.findById(r._id, { id: 1, fullName: 1 });
				return {
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
