const { options } = require("joi");
const Item = require("../../model/Item");
const Shop = require("../../model/shop");

exports.deleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { _id: ownerId } = req.user;

        const shopDetails = await Shop.findOne({ owner: ownerId });
        if (!shopDetails) {
            return res.status(404).json({
                success: false,
                message: "Shop not found"
            });
        }

        const isItemInShop = shopDetails.foodItems.some(
            (id) => id.toString() === itemId
        );

        if (!isItemInShop) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this item"
            });
        }

        const item = await Item.findByIdAndDelete(itemId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        shopDetails.foodItems = shopDetails.foodItems.filter(
            (id) => id.toString() !== itemId
        );

        await shopDetails.save();

        await shopDetails.populate({
            path: "foodItems",
            options:{sort:{updateAt:-1}},
            select: "name price image category foodType"
        });

        return res.status(200).json({
            success: true,
            message: "Item deleted successfully",
            data: shopDetails
        });

    } catch (error) {
        console.error("Delete item error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Could not delete item"
        });
    }
};
