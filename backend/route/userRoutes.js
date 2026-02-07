const express = require('express');
const { fetchLoggedInUser } = require('../controller/userController/fetchLoggedInUser.controller');
const { autheriseduser } = require('../middleware/autherisedUser');
const { isConsumer } = require('../middleware/isAutherised');
const { validateCityIdParam } = require('../middleware/shopValidation');
const { getAllShopByCity } = require('../controller/shopController/getAllShopByCity');
const { getItemByCity } = require('../controller/itemController/getItemByCity');
const userRouter = express.Router();

userRouter.get('/currentUser', autheriseduser, fetchLoggedInUser);
userRouter.get('/getAllShopByCity/:city', autheriseduser, isConsumer, validateCityIdParam, getAllShopByCity);
userRouter.get('/getItemByCity/:city', autheriseduser, isConsumer, validateCityIdParam, getItemByCity);

module.exports = userRouter;