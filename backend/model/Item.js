const mongoose = require('mongoose');

const Itemchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    category: {
        type: String,
        default: "others",
        lowercase: true,
        enum: [
            "snacks",
            "main course",
            "desserts",
            "pizza",
            "burgers",
            "sandwiches",
            "south indian",
            "north indian",
            "chinese",
            "fast food",
            "others"
        ]
    },
    price: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    foodType: {
        type: String,
        default: "Veg",
        enum: ["Veg", "Non-Veg"],
        required: true
    },
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    public_id: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.models.Item || mongoose.model('Item', Itemchema);