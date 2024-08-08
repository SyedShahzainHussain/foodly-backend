const mongoose = require('mongoose');


const ResturantCategory = mongoose.Schema({
    title: { type: String, required: true },
    time: { type: String, required: true },
    imageUrl: { type: String, required: true },
    foods: { type: Array, default: [] },
    pickup: { type: Boolean, default: true },
    delivery: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: true },
    owner: { type: String, required: true },
    code: { type: String, required: true },
    logoUrl: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    ratingCount: { type: String, default: "267" },
    verification: { type: String, default: "Pending", enum: ["Pending", "Verified", "Rejected"] },
    verificationMessage: { type: String, default: "Your resturant is under review. We will notify you once it is verified." },
    coords: {
        id: { type: String },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        latitudeDelta: { type: Number, default: 0.0122 },
        longitudeDelta: { type: Number, default: 0.0122 },
        address: { type: String, required: true },
        title: { type: String, required: true },

    }
});


module.exports = mongoose.model("Restaurant", ResturantCategory);