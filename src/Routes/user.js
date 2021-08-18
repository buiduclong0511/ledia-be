const express = require("express");

const userController = require("../App/Controllers/UserController");
const checkExistedUser = require("../MiddleWares/checkExistedUser");
const verifyToken = require("../MiddleWares/verifyToken");

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", checkExistedUser, userController.register);

module.exports = router;