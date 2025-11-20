// const User = require('../model/User');
const user = require('../../model/user');
const { hashPassword } = require('../../utils/hash');

exports.userRegistration = async (req, res) => {
    try {

        const { userName, phoneNo, password, email, category } = req.body;
        const existingUser = await user.findOne({ phoneNo, email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: `User already registered with phoneNo: ${phoneNo}`
            });
        }
        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong in fetching hashPassword'
            })
        }

        const response = await user.create({ userName, phoneNo, password: hashedPassword, email, category, refreshToken: '' })
        if (!response) {
            return res.status(400).json({
                success: false,
                message: "Failed to create user after hashing"
            });
        }

        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: response
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error signing up",
            error: error.message
        })
        
    }

}