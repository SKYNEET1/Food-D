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
        default:"others",
        enum: [
            "Snacks",
            "Main Course",
            "Desserts",
            "Pizza",
            "Burgers",
            "Sandwiches",
            "South Indian",
            "North Indian",
            "Chinese",
            "Fast Food",
            "Others"
        ],
        required:true
    },
    price: {
        type: Number,
        min:0,
        default:0,
        required: true
    },
    foodType: {
        type: String,
        default:"Veg",
        enum:["Veg", "Non-Veg"],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.models.Item || mongoose.model('Item', Itemchema);