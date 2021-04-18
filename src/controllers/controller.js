const sendSuccess = (res, data, status = 200, message = 'success') => {
	return res.status(status).json({
		message: message,
		data: data
	});
};

const sendError = (res, message) => {
	return res.status(500).json({
		message: message || 'internal server error'
	});
};

module.exports = { sendSuccess, sendError };
