const Item = require('../../model/Item');
const shop = require('../../model/shop');
const { uploadOnCloudinary } = require('../../utils/cloudinary');
const { v2: cloudinary } = require("cloudinary");
const fs = require('fs');

exports.editItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { name, category, foodType, price } = req.body;
        const { _id, email } = req.user;

        const shopDoc = await shop.findOne({ owner: _id }).select('_id').lean();
        if (!shopDoc) {
            return res.status(404).json({
                success: false,
                message: "Shop not found"
            });
        }

        const existingItem = await Item.findOne({ _id: itemId, shop: shopDoc._id });

        if (!existingItem) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to edit this item",
            });
        }

        const updateData = {};

        if (name) updateData.name = name;
        if (category) updateData.category = category;
        if (foodType) updateData.foodType = foodType;
        if (price !== undefined) updateData.price = Number(price);

        if (req.file) {
            const image = await uploadOnCloudinary(req.file.path);

            if (!image) {
                return res.status(400).json({
                    success: false,
                    message: "Image upload failed"
                });
            }

            if (existingItem.public_id) {
                await cloudinary.uploader.destroy(existingItem.public_id);
            }

            updateData.image = image.url;
            updateData.public_id = image.public_id;

            fs.unlink(req.file.path, (err) => {
                if (err) console.error("File cleanup error:", err);
            });
        }

        await Item.findOneAndUpdate(
            { _id: itemId, shop: shopDoc._id },
            { $set: updateData },
            { new: true }
        );

        const shopItem = await shop.findOne({ owner: _id, foodItems: itemId })
            .populate({
                path: "foodItems",
                options: { sort: { updatedAt: -1 } }
            });

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
