const express = require('express');
const { autheriseduser } = require('../middleware/autherisedUser');
const { isrestaurant } = require('../middleware/isAutherised');
const { createAndUpdateShop } = require('../controller/shopController/createAndUpdateShop');
const uploadFile = require('../middleware/multer');
const { getShop } = require('../controller/shopController/getShop');
const { validateCreateShop } = require('../middleware/shopValidation');
const shopRouter = express.Router();

shopRouter.post(
    '/createAndUpdateShop',
    autheriseduser,
    isrestaurant,
    (req, res, next) => {
        console.log("Before multer");
        next();
    },
    uploadFile.single('image'),
    (req, res, next) => {
        console.log("After multer", req.file);
        next();
    },
    validateCreateShop,
    createAndUpdateShop
);

shopRouter.get('/getShop', autheriseduser, isrestaurant, getShop);

module.exports = shopRouter;