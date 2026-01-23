const user = require('../../model/user');
const { generateAccessToken, generateRefreshToken } = require('../../utils/jwt')
const admin = require("../../utils/firebase");

exports.googleSignin = async (req, res) => {
    try {

        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token missing" });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);

        const { email } = decodedToken;
        const isUser = await user.findOne({ email })
        if (!isUser) {
            return res.status(400).json({
                status: false,
                message: 'User is not registered'
            });
        }

        const accessToken = generateAccessToken(isUser.email, isUser.category, isUser._id);
        const refreshToken = generateRefreshToken(isUser.phoneNo, isUser._id);
        isUser.refreshToken = refreshToken;
        await isUser.save()

        if (!accessToken) {
            return res.status(400).json({
                success: false,
                message: 'accessToken could not be generated'
            })
        }
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'refreshtoken could not be generated'
            })
        }
        await res.cookie('token', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000
        })
        await res.cookie("refresh", refreshToken, {
            httpOnly: true,  
            secure: false,    
            sameSite: "lax", 
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            success: true,
            message: `${isUser.category} login successful`,
            data:isUser
        });


    } catch (error) {

        return res.status(500).json({
            message: "Error logging in through Google",
            error: error.message
        })
    }

}
