const express = require('express');
const validateRegistration = require('../middleware/registrationBodyValidate');
const { userRegistration } = require('../controller/userRegistration');
const { userLogin } = require('../controller/userLogin');
const { userLogout } = require('../controller/userLogout');
const { authenticateUser } = require('../middleware/autherisedUser');
const validateLoginBody = require('../middleware/loginBodyValidate');
const { generateRefreshToken } = require('../utils/jwt');
const userRouter = express.Router()

userRouter.post('/refresh',generateRefreshToken)

userRouter.post('/auth/signup', validateRegistration, userRegistration)
userRouter.post('/auth/login', validateLoginBody, userLogin)
userRouter.post('/auth/logout', authenticateUser, userLogout)


module.exports = userRouter