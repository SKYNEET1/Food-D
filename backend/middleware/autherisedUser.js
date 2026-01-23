const jwt = require('jsonwebtoken');

exports.autheriseduser = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();

    } catch (error) {

        console.log(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Access token expired. Please refresh your token.',
                expiredAt: error.expiredAt
            });
        }
        return res.status(400).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        });

    }
}

exports.autherisedOTP = async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.otpToken) {
        token = req.cookies.otpToken;
    }
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    console.log(token)
    try {

        const decode = jwt.verify(token, process.env.OTP_TOKEN)
        req.user = decode
        next();

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: 'Invalid otp token',
            error: error.message
        });

    }
}