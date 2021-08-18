const User = require("../App/Models/User");

async function checkExistedUser(req, res, next) {
    try {
        const email = req.body.email;
        const users = await User.find({ email });
        if (!users.length) {
            next();
        } else {
            res.status(409).json({
                message: "Email is existed!"
            });
        }
    } catch (err) {
        res.status(500).json({
            err
        });
    }
}

module.exports = checkExistedUser;