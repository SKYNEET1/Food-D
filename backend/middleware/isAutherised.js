const user = require('../model/user')

const isConsumer = async (req, res, next) => {
    try {

        const { _id, email } = req.user;

        const isUser = await user.findById(_id);
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: 'user is not authorized',
            });
        }

        if (isUser.category !== 'consumer') {
            return res.status(400).json({
                success: false,
                message: 'Not authorized',
            });
        }

        next();

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message || 'Server error',
        });

    }
}


const isrestaurant = async (req, res, next) => {
    try {

        const { _id, email } = req.user;

        const isUser = await user.findById(_id);
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: 'user is not authorized',
            });
        }

        if (isUser.category !== 'restaurant') {
            return res.status(400).json({
                success: false,
                message: 'Not authorized',
            });
        }

        next();

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message || 'Server error',
        });

    }
}


// const isDeliveryagent = async (req, res, next) => {
//     try {

//         const { _id, email } = req.user;

//         const isUser = await user.findById(_id);
//         if (!isUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'user is not authorized',
//             });
//         }

//         next();

//     } catch (error) {

//         return res.status(400).json({
//             success: false,
//             message: error.message || 'Server error',
//         });

//     }
// }


module.exports = { isConsumer, isrestaurant };