const express = require('express');
const { generateRefreshToken } = require('../utils/jwt');
const { verifyOTP } = require('../controller/userController/verifyOTP');
const { validateLoginBody, validateRegistration, validatingForgotPassword } = require('../middleware/userValidation');
const { autheriseduser, autherisedOTP } = require('../middleware/autherisedUser');
const { sendOTPforgotPass } = require('../controller/userController/sendOTPforgotPass');
const { userRegistration } = require('../controller/userController/userRegistration');
const { userLogin } = require('../controller/userController/userLogin');
const { userLogout } = require('../controller/userController/userLogout');
const { newPassword } = require('../controller/userController/newPassword');
const { googleAuth } = require('../controller/authController/googleAuth.Conttoller');
const userRouter = express.Router();

userRouter.post('/refresh', generateRefreshToken);

userRouter.post('/auth/signup', validateRegistration, userRegistration);
userRouter.post('/auth/signin', validateLoginBody, userLogin);
userRouter.post('/auth/logout', autheriseduser, userLogout);
userRouter.post('/auth/forgotpassword', validatingForgotPassword, sendOTPforgotPass);
userRouter.post('/auth/verifyOTP', validatingForgotPassword, verifyOTP);
userRouter.post('/auth/newpassword', autherisedOTP, newPassword);
userRouter.post('/auth/googleAuth',googleAuth)

module.exports = userRouter