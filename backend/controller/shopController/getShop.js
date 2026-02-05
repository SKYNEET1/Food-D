const shop = require("../../model/shop");
const user = require("../../model/user");

exports.getShop = async (req, res) => {

    try {
        const { _id, email } = req.user;
        console.log('req.user', req.user);
        // console.log('type of _id',typeof(_id));

        const isShop = await shop.findOne({ owner: _id }).populate({
            path: "foodItems",
            select: "name price image category foodType",
            options: { sort: { updatedAt: -1 } }
        }).lean();
        if (!isShop) {
            return res.status(200).json({
                success: false,
                message: `${email}, owner dont have any shop.`,
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Shop found successfully',
            data: isShop
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        })
    }
}