const User = require("../../model/user");
const { generateAccessToken } = require("../../utils/jwt");
const admin = require("../../utils/firebase");

exports.googleAuth = async (req, res) => {
  try {
    const { token, phoneNo, category } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    // ✅ Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);

    const { name, email } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        userName: name,
        email,
        phoneNo,
        category,
      });
    }

    const jwtToken = generateAccessToken(user._id);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: `${user.userName} login successful`,
    });

  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({
      message: "Error logging in through Google",
      error: error.message,
    });
  }
};
