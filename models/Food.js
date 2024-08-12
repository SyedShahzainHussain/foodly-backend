const moongoose = require("mongoose");

const FoodSchema = moongoose.Schema({
    title: { type: String, required: true }, 
    time: { type: String, required: true }, 
    foodTags: { type: Array, required: true },
    foodType: { type: Array, default: [] },
    additives: { type: Array, default: [] },
    category: { type: String, required: true },
    code: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    restaurant: { type: moongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    ratingCount: { type: String, default: "267" },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: Array, required: true },
});

module.exports = moongoose.model("Food", FoodSchema);

