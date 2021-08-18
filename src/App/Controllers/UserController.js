const jwt = require('jsonwebtoken');
const md5 = require('md5');

const User = require('../Models/User');

class UserController {

    // [POST] /users/login
    login = async (req, res) => {
        try {
            const body = req.body;
            const user = await User.find({
                email: body.email,
                password: md5(body.password)
            }, "-password");
            if (user.length) {
                const token = jwt.sign(body, process.env.TOKEN_SECRET_KEY);
                res.json({
                    userInfo: user[0],
                    token
                });
            } else {
                res.status(401).json();
            }
        } catch (err) {
            res.status(500).json({
                err
            });
        }
    }

    // [POST] /users/register
    register = async (req, res) => {
        try {
            const body = req.body;
            const token = jwt.sign(body, process.env.TOKEN_SECRET_KEY);
            const newUser = new User({
                username: body.username,
                email: body.email,
                password: md5(body.password),
            });
            const savedUser = await newUser.save();
            const {
                password,
                ...dataRes
            } = savedUser._doc;
            res.json({
                userInfo: dataRes,
                token
            });
        } catch (err) {
            res.status(500).json({
                err
            });
        }
    }
}

module.exports = new UserController;