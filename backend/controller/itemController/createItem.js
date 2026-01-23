const Item = require('../../model/Item');
const shop = require('../../model/shop');
const { uploadOnCloudinary } = require('../../utils/cloudinary');
const fs = require('fs');

exports.createItem = async (req, res) => {

    try {
        const { name, category, foodType, price } = req.body;
        const { email, _id } = req.user;

        const isShop = await shop.findOne({ owner: _id });
        if (!isShop) {
            return res.status(400).json({
                success: false,
                message: "Shop is not yet registered"
            });
        }

        const values = {
            name,
            category,
            foodType,
            price,
            shop: isShop._id
        }
        values.price = Number(price);

        if (req.file) {
            const image = await uploadOnCloudinary(req.file.path);

            if (!image) {
                return res.status(400).json({
                    success: false,
                    message: "Image upload failed"
                });
            }

            values.image = image;

            fs.unlink(req.file.path, (err) => {
                if (err) console.error("File cleanup error:", err);
            });
        }

        const result = await Item.create(values);
        const shopItem = await shop.findOne({ owner: _id, ownerEmail: email });
        shopItem.foodItems.push(result._id);
        await shopItem.save();

        const updatedShop = await shop.findOne({
            owner: _id,
            ownerEmail: email
        }).populate({
            path: "foodItems",
            select: "name price image category foodType"
        });

        console.log('populated >>>',updatedShop);


        return res.status(201).json({
            success: true,
            message: 'Successfully created',
            data: updatedShop
        });

    } catch (error) {
        console.error("Create item error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || 'Could not create new shop'
        });

    }
}