const mongoose = require("mongoose");
const { Schema } = mongoose;

const travelSchema = new Schema({
    packageName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    includes: {
        type: [String],
        required: true,
    },
    imageFileName: String,
    imageURL: String,
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["adventure", "pilgrimage", "beach", "iconic", "wildlife", "luxury","trekking","forest","relaxation"],
        required: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const Travel = mongoose.model("Travel", travelSchema);
module.exports = Travel;
