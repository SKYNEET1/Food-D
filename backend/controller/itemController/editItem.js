const mongoose = require("mongoose");
const Item = require('../../model/Item');
const shop = require('../../model/shop');
const { uploadOnCloudinary } = require('../../utils/cloudinary');
const fs = require('fs');

exports.editItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { name, category, foodType, price } = req.body;
        const { _id, email } = req.user;

        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid item id"
            });
        }

        const shopDoc = await shop.findOne({ owner: _id });
        if (!shopDoc) {
            return res.status(400).json({
                success: false,
                message: "Shop not found"
            });
        }

        const updateData = {
            name,
            category,
            foodType,
            price: Number(price)
        };

        if (req.file) {
            const image = await uploadOnCloudinary(req.file.path);

            if (!image) {
                return res.status(400).json({
                    success: false,
                    message: "Image upload failed"
                });
            }

            updateData.image = image;

            fs.unlink(req.file.path, (err) => {
                if (err) console.error("File cleanup error:", err);
            });
        }

        await Item.findByIdAndUpdate(
            itemId,
            { $set: updateData },
            { new: true }
        );

        const shopItem = await shop.findOne({ owner: _id, foodItems: itemId }).populate('foodItems');

        return res.status(200).json({
            success: true,
            message: "Item updated successfully",
            data: shopItem
        });

    } catch (error) {
        console.error("Edit item error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Could not update item"
        });

    }
};
