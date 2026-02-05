const express = require('express');
const { fetchLoggedInUser } = require('../controller/userController/fetchLoggedInUser.controller');
const { autheriseduser } = require('../middleware/autherisedUser');
const { isConsumer } = require('../middleware/isAutherised');
const { validateCityParam } = require('../middleware/shopValidation');
const { getAllShopByCity } = require('../controller/shopController/getAllShopByCity');
const userRouter = express.Router();

userRouter.get('/currentUser', autheriseduser, fetchLoggedInUser);
userRouter.get('/getAllShopByCity/:city', autheriseduser,isConsumer, validateCityParam, getAllShopByCity);

module.exports = userRouter;