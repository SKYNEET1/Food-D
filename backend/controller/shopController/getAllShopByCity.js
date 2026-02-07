const shop = require('../../model/shop');

exports.getAllShopByCity = async (req, res) => {
    try {

        let { city } = req.params;
        if (!city) {
            return res.status(400).json({
                success: false,
                message: "Invalid City"
            });
        }
        city = city.trim().toLowerCase();

        const shopDetails = await shop.find({ city }).limit(50).populate("foodItems").lean(); //.lean() will help u to give plane js object not mongo object so no other features like .save() etc will work.
        if (shopDetails.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Current coverage does not include ${city}`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Successfully retrieved ${shopDetails.length} locations in ${city}`,
            data: shopDetails
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        })
    }
}