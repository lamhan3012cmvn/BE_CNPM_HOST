const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        //console.log('error ' + err)
        if (err) return res.sendStatus(403).send({ error: 'Not authorized to access this resource' })

        req.user = user

        req.token = token
        //console.log(req.user)
        next()
    })
}


module.exports = auth