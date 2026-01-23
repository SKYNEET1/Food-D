const express = require('express');
const { fetchLoggedInUser } = require('../controller/userController/fetchLoggedInUser.controller');
const { autheriseduser } = require('../middleware/autherisedUser');
const { isConsumer } = require('../middleware/isAutherised');
const userRouter = express.Router();

userRouter.get('/currentUser', autheriseduser, fetchLoggedInUser);

module.exports = userRouter;