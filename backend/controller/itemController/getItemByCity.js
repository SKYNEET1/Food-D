const Item = require("../../model/Item");
const shop = require("../../model/shop");

exports.getItemByCity = async (req, res) => {
    try {
        const { city } = req.params;

        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City name is required"
            });
        }

        const shops = await shop.find({ city }).select('_id').lean();

        if (shops.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Shops not found"
            });
        }

        const shopIds = shops.map((sp) => sp._id);

        const items = await Item.find({shop:{$in:shopIds}});

        return res.status(200).json({
            success: true,
            message: ` Shops found under ${city} `,
            data: items
        });

    } catch (error) {
        console.error("getItemByCity error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
