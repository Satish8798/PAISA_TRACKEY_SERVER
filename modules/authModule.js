const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req,res,next) => {
    try {
        const user = jwt.verify(req.headers["access-token"],process.env.JWT_KEY)
        next();
    } catch (error) {
        return res.status(400).send({
            error: 'invalid token'
        })
    }
}