const express = require('express');
const { generateRefreshToken } = require('../utils/jwt');
const { verifyOTP } = require('../controller/onboardingController/verifyOTP');
const { validateLoginBody, validateRegistration, validatingForgotPassword } = require('../middleware/userValidation');
const { autheriseduser, autherisedOTP } = require('../middleware/autherisedUser');
const { sendOTPforgotPass } = require('../controller/onboardingController/sendOTPforgotPass');
const { userRegistration } = require('../controller/onboardingController/userRegistration');
const { userLogin } = require('../controller/onboardingController/userLogin');
const { userLogout } = require('../controller/onboardingController/userLogout');
const { newPassword } = require('../controller/onboardingController/newPassword');
const { googleAuth } = require('../controller/authController/googleAuth.Conttoller');
const { googleSignin } = require('../controller/authController/googleAuth.signin.controller');
const onboardingRouter = express.Router();

onboardingRouter.post('/refresh', generateRefreshToken);

onboardingRouter.post('/auth/signup', validateRegistration, userRegistration);
onboardingRouter.post('/auth/signin', validateLoginBody, userLogin);
onboardingRouter.post('/auth/signout', userLogout);
onboardingRouter.post('/auth/forgotpassword', validatingForgotPassword, sendOTPforgotPass);
onboardingRouter.post('/auth/verifyOTP', validatingForgotPassword, verifyOTP);
onboardingRouter.post('/auth/newpassword', autherisedOTP, newPassword);
onboardingRouter.post('/auth/googleAuth',googleAuth);
onboardingRouter.post('/auth/googleSignin',googleSignin);

module.exports = onboardingRouter