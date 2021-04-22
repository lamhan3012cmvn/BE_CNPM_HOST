const jwt = require('jsonwebtoken')
const {ACCESS_TOKEN_SECRET} = require("../config/index")
const verify=(req,res,next)=>{
	const header = req.headers.authorization;
  
	if (!header) {
		res.json({
			data: {
				tokenVerificationData: { access: false, message: 'No token provided' }
			}
		});
		return;
	}
	const token = header.split(' ')[1];
	console.log('tokenService token: ' + token);
	jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedFromToken) => {
		if (err) {
			res.json({
				data: {
					tokenVerificationData: {
						access: false,
						message: 'Failed to verify token'
					}
				}
			});
			return;
		} else {
			// console.log(decodedFromToken);
			// there's decodedFromToken.user that can only be reached with casting
			// that's why it is wrapped in <{user: object}>
			// const decoded = <{user: object}>decodedFromToken;
			// const decodedUser = <ISafeUser>decoded.user;
			// // res.json({tokenVerificationData: { access: true, user: decodedUser } });
			// req.verifiedUser = decodedUser;
			req.value = { body: { decodeToken: decodedFromToken ,token} };
			next();
		}
	});

  
}
const createToken=(data)=>{
  return jwt.sign(
    {
      iss: 'Pham Tan Dat',
      data: data,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    ACCESS_TOKEN_SECRET
  );
}

module.exports={
  verify,createToken
}