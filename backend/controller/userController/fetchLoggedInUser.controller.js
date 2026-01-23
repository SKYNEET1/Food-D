const user = require("../../model/user");

exports.fetchLoggedInUser = async (req, res) => {

    try {
        const { _id, email } = req.user;
        console.log('req.user',req.user);
        console.log(_id);

        const isUser = await user.findById(_id);
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: 'User not found.'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User found successfully',
            data: isUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Could not found _id and email from token'
        })
    }
}