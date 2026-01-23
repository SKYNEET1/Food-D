const User = require("../../model/user");
const { hashPassword, comparePassword } = require("../../utils/hash");

exports.newPassword = async (req, res) => {
    try {
        const { email } = req.user;
        const { password } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email not provided"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        const targetUser = await User.findOne({ email });
        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const hashedPassword = await hashPassword(password);
        const isSamePassword = await comparePassword(password, targetUser.password);
        if (isSamePassword) {
            return res.status(404).json({
                success: false,
                message: "New password should not be same as of previous one"
            });
        }

        // 4️⃣ Update password
        const result = await User.updateOne(
            { email },
            { $set: { password: hashedPassword } }
        );

        return res.json({
            success: true,
            message: "Password updated successfully",
            result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server error", 
        });
    }
};
