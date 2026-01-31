const express = require('express');
const { autheriseduser } = require('../middleware/autherisedUser');
const { isrestaurant } = require('../middleware/isAutherised');
const { createItem } = require('../controller/itemController/createItem');
const { editItem } = require('../controller/itemController/editItem');
const uploadFile = require('../middleware/multer');
const { getTargetItem } = require('../controller/itemController/gettargetItem');
const { validateCreateItem, validateEditItem } = require('../middleware/itemValidation');
const itemRouter = express.Router();
const mongoose = require("mongoose");
const { deleteItem } = require('../controller/itemController/deleteItem');

itemRouter.post('/addItem', autheriseduser, isrestaurant, uploadFile.single('image'), validateCreateItem, createItem);

itemRouter.post('/updateItem/:itemId', autheriseduser, isrestaurant, uploadFile.single('image'),
    (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.itemId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid itemId"
            });
        }

        next();
    },
    validateEditItem,
    editItem);

itemRouter.get('/getTargetItem/:itemId', autheriseduser, isrestaurant,
    (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.itemId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid itemId"
            });
        }

        next();
    },
    getTargetItem);

itemRouter.delete('/deleteItem/:itemId', autheriseduser, isrestaurant,
    (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.itemId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid itemId"
            });
        }

        next();
    },
    deleteItem);

module.exports = itemRouter;