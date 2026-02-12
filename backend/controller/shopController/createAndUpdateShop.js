const shop = require('../../model/shop');
const { uploadOnCloudinary } = require('../../utils/cloudinary');
const fs = require('fs');

exports.createAndUpdateShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body;
        const { email, _id } = req.user;

        if (!name || !city || !state || !address) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const updateData = {
            name,
            city,
            state,
            address,
            owner: _id,
            ownerEmail: email
        };

        if (req.file) {
            const uploadedImage = await uploadOnCloudinary(req.file.path);

            if (!uploadedImage) {
                return res.status(400).json({
                    success: false,
                    message: "Image upload failed"
                });
            }

            updateData.image = uploadedImage.url;
            updateData.public_id = uploadedImage.public_id;

            if (fs.existsSync(req.file.path)) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error("File cleanup error:", err);
                });
            }
        }

        const result = await shop.findOneAndUpdate(
            { owner: _id, ownerEmail: email },
            { $set: updateData },
            { upsert: true, new: true }
        ).populate("owner foodItems");

        return res.status(200).json({
            success: true,
            message: "Shop created / updated successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `CreateAndUpdateShop controller >>> ${error.message}`
        });
    }
};
