const { options } = require("joi");
const Item = require("../../model/Item");
const Shop = require("../../model/shop");
const { v2: cloudinary } = require("cloudinary");

exports.deleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { _id: ownerId } = req.user;

        const shopDetails = await Shop.findOne({ owner: ownerId }).select("_id").lean();
        // shopDetails => { _id: new ObjectId('69804a5ee005e64103da6d7e') }
        if (!shopDetails) {
            return res.status(404).json({
                success: false,
                message: "Shop not found"
            });
        }

        const deletedItem = await Item.findOneAndDelete({
            _id: itemId,
            shop: shopDetails._id
        });

        if (!deletedItem) {
            return res.status(403).json({
                success: false,
                message: "Item not found or not autherised"
            });
        }

        if (deletedItem.image && deletedItem.image.public_id) {
            console.log('Successfully deleted from cloudinary cloud');
            await cloudinary.uploader.destroy(deletedItem.image.public_id);
        }

        await Shop.updateOne(
            { _id: shopDetails._id },
            {
                $pull: {
                    foodItems: itemId
                }
            }
        )

        const updatedShop = await Shop.findById(shopDetails._id).populate({
            path: "foodItems",
            options: { sort: { updatedAt: -1 } },
            select: "name price image category foodType"
        });;

        return res.status(200).json({
            success: true,
            message: "Item deleted successfully",
            data: updatedShop
        });

    } catch (error) {
        console.error("Delete item error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Could not delete item"
        });
    }
};
