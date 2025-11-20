const { generateOTP, hmacotp } = require("../../utils/OTPcreation");
const client = require("../../utils/redisSetup");
const User = require('../../model/user');
const sendOTPMail = require("../../utils/mail");

exports.sendOTPforgotPass = async (req, res) => {

    try {

        const { email } = req.body;
        const isUser = await User.findOne({ email });
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const cooldown_key = `otp:cooldown:${email}`;
        const cooldown_TTL = await client.ttl(cooldown_key);
        if (cooldown_TTL > 0) {
            return res.status(429).json({
                success: false,
                message: `Please wait ${cooldown_TTL} seconds before requesting OTP again`
            });
        }

        const attempt_key = `attempt:${email}`;
        let attempt = await client.get(attempt_key);
        attempt = attempt ? parseInt(attempt) : 0;

        if (attempt > 5) {
            return res.status(403).json({
                success: false,
                message: "You have exceeded the maximum OTP requests today"
            });
        }

        const otp = generateOTP();
        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "OTP generation error"
            });
        }

        const Hotp = hmacotp(otp, email);
        if (!Hotp) {
            return res.status(400).json({
                success: false,
                message: "OTP encryption error"
            });
        }

        const key = `otp:data:${email}`;
        const ttl = 10 * 60;

        await client
            .multi()
            .hset(key, "hash", Hotp)
            .expire(key, ttl)
            .exec();

        await client.incr(attempt_key);
        await client.expire(attempt_key, 24 * 60 * 60);
        await client.set(cooldown_key, 1, "EX", 10 * 60)


        // 4) Send OTP to user (sms/email)
        console.log("Generated OTP (only show in development):", otp);
        await sendOTPMail(email, otp);

        return res.json({
            success: true,
            message: "OTP sent successfully",
            devOtp: otp
        });

    } catch (error) {

        console.print("ERROR", "OTP Sending", `Error in OTP sending => ${error}`, __filename)
        return res.status(500).json({
            message: "Error in sending otp",
            error: error.message
        })
    }

}