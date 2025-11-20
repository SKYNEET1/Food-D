const jwt = require('jsonwebtoken');

const generateAccessToken = (phoneNo, category, _id) => {
    return jwt.sign(
        { phoneNo, category, _id },
        process.env.JWT_KEY,
        { expiresIn: '2h' }
    )
}

const generateOTPToken = (email,otp) => {
    return jwt.sign(
        {email, otp},
        process.env.OTP_TOKEN,
        {expiresIn: '1h'}
    )
}

const generateRefreshToken = (phoneNo,_id) => {
    return jwt.sign(
        { phoneNo, _id },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '7d' }
    )
}

module.exports = { generateAccessToken, generateRefreshToken, generateOTPToken }