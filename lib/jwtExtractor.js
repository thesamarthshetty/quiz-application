const jwt = require('jsonwebtoken');

const extractDataFromToken = async (req, res, next) => {
    const { headers } = req
    let { authorization } = headers
    if (!authorization) return res.status(400).send({ message: 'Invalid Token' })
    try {
        authorization = authorization.split(" ")[1]
        const result = jwt.verify(authorization, process.env.JWT_KEY);
        req.body.email = result.email

        next()
    } catch (err) {
        res.status(400).send({ message: err })
    }

}

module.exports = extractDataFromToken