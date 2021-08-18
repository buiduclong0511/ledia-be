const jwt = require("jsonwebtoken");

const User = require("../App/Models/User");

async function verifyToken(req, res, next) {
    try {
        const headers = req.headers;
        const token = headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const user = await User.find({ email: decoded.email }, "-password");
        if (user.length) {
            req.userInfo = user[0];
            next();
        } else {
            res.status(401).json();
        }
    } catch (err) {
        res.status(500).json({
            err
        });
    }
}

module.exports = verifyToken;