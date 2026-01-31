const mongoose = require("mongoose");
const Item = require("../../model/Item");

exports.getTargetItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item id is required"
      });
    }

    const item = await Item.findById(itemId).lean();

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item found successfully",
      data: item
    });

  } catch (error) {
    console.error("getTargetItem error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
