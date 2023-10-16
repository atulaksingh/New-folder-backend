const UserModel = require("../models/user")
var jwt = require('jsonwebtoken');

async function checkAuth(req, res, next) {
    let token
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            //get token from headers
            token = authorization.split(' ')[1]

            //Verify Token
            const { userID } = jwt.verify(token, process.env.JWT_SECREt_KEY)

            //get user from token
            req.user = await UserModel.findById(userID).select('-userpassword')
            // console.log("rr", req.user)
            next()
        } catch (error) {
            res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
        }
    }
    if (!token) {
        res.status(401).send({ "status": "failed", "message": "Unauthorized User , No Token" })
    }
}

module.exports = checkAuth;