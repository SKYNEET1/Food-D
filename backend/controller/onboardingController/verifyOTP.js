const { generateOTPToken } = require("../../utils/jwt");
const { hmacotp, timingSafeEqualHex } = require("../../utils/OTPcreation");
const client = require("../../utils/redisSetup");

exports.verifyOTP = async (req, res) => {

    try {

        const { otp, email } = req.body;
        if (!otp || !email) {
            return res.status(400).json({
                success: false,
                message: "OTP and email required"
            });
        }

        const key = `otp:data:${email}`;
        const attemptsKey = `attempt:${email}`;
        const noOfAttempt = await client.get(attemptsKey);
        const storedHotp = await client.hget(key, 'hash');
        if (!storedHotp) {
            return res.status(400).json({
                success: false,
                message: "OTP expired or not found"
            });
        }

        const newOtpHash = hmacotp(otp, email);
        if (!newOtpHash) {
            return res.status(400).json({
                success: false,
                message: "New OTP could not be encrypted"
            });
        }

        const isValid = timingSafeEqualHex(storedHotp, newOtpHash);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        // await client.incr(attemptsKey);
        await client.del(key);

        const otpToken = generateOTPToken(email, otp);
        if (!otpToken) {
            return res.status(400).json({
                success: false,
                message: 'OtpToken could not be generated'
            })
        }
        await res.cookie('otpToken', otpToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 30 * 60 * 1000
        })

        return res.json({
            success: true,
            noOfAttempt,
            message: "OTP verified successfully, you may reset password now"
        });

    } catch (error) {

        console.error("Error in passwordReset:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Server error", 
        });

    }

}