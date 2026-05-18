const express = require('express')
const verifyToken = require('../middlewares/auth.middleware')
const {UserRegisterController,UserLoginController, UserDeleteAccountController} = require('../controllers/auth.controller')
const authRouter = express.Router()


authRouter.post("/register", UserRegisterController )
authRouter.get("/login",verifyToken, UserLoginController)
authRouter.delete("/delete-account", verifyToken, UserDeleteAccountController)

module.exports = authRouter