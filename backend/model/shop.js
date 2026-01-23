const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    ownerEmail:{
        type:String,
    },
    city: {
        type: String,
        required:true
    },
    state: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    foodItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    }]
}, { timestamps: true });

module.exports = mongoose.models.Shop || mongoose.model('Shop', shopSchema);