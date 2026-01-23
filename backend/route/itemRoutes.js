const express = require('express');
const { autheriseduser } = require('../middleware/autherisedUser');
const {  isrestaurant } = require('../middleware/isAutherised');
const { createItem } = require('../controller/itemController/createItem');
const { editItem } = require('../controller/itemController/editItem');
const uploadFile = require('../middleware/multer');
const { getTargetItem } = require('../controller/itemController/gettargetItem');
const itemRouter = express.Router();

itemRouter.post('/addItem', autheriseduser, isrestaurant, uploadFile.single('image'), createItem);
itemRouter.post('/updateItem/:itemId', autheriseduser, isrestaurant, uploadFile.single('image'), editItem);
itemRouter.get('/getTargetItem/:itemId', autheriseduser, isrestaurant, getTargetItem);

module.exports = itemRouter;