const User = require("../../model/user");
const { hashPassword } = require("../../utils/hash");

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
        
        // 4️⃣ Update password
        const result = await User.updateOne(
            { email },
            { $set: { password: hashedPassword } }
        );

        // if (result.modifiedCount === 0) {
        //     return res.status(500).json({
        //         success: false,
        //         message: "Failed to update password"
        //     });
        // }

        return res.json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
