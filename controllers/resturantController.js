const Restaurant = require("../models/Rasturant");


module.exports = {

    // Todo Create Restaurant
    createRestaurant: async (req, res) => {
        const { title, time, imageUrl, owner, code, logoUrl, coords } = req.body;
        if (!title || !time || !imageUrl || !owner || !code || !logoUrl || !coords || !coords.latitude || !coords.longitude || !coords.address || !coords.title) {
            return res.status(400).json({ status: false, message: "You have a missing field" });
        }
        try {
            const newRestaurant = new Restaurant(req.body);
            await newRestaurant.save();
            res.status(201).json({ status: true, message: "Restaurant created successfully" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    // Todo Get Restaurant by id
    getRestaurantById: async (req, res) => {
        const id = req.params.id;
        try {
            const resturant = await Restaurant.findById(id);
            res.status(200).json({ status: true, resturant });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    // Todo Get Random Restaurant
    getRandomRestaurant: async (req, res) => {
        const code = req.params.code;
        try {
            let randomRestaurant = [];
            if (code) {
                randomRestaurant = await Restaurant.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } },
                ]);
            }
            if (randomRestaurant.length === 0) {
                randomRestaurant = await Restaurant.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } },
                ]);
            }
            res.status(200).json({ status: true, randomRestaurant });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    // Todo Get All Random Restaurant
    getAllNearByRestaurant: async (req, res) => {
        const code = req.params.code;
        try {
            let allNearByRestaurant = [];
            if (code) {
                allNearByRestaurant = await Restaurant.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $project: { __v: 0 } }
                ]);
            }
            if (allNearByRestaurant.length === 0) {
                allNearByRestaurant = await Restaurant.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $project: { __v: 0 } }
                ]);
            }
            res.status(200).json({ status: true, allNearByRestaurant });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
};



