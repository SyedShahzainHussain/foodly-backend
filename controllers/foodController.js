const Food = require('../models/Food');


module.exports = {
    addFood: async (req, res) => {
        const { title, foodTags, category, time, code, restaurant, description, price, additives, imageUrl } = req.body;
        if (!title || !foodTags || !category || !time || !code || !restaurant || !description || !price || !additives || !imageUrl) {
            return res.status(400).json({ status: false, message: "You have a missing field" });
        }

        try {
            const newFood = new Food(req.body);
            await newFood.save();
            res.status(201).json({ status: true, message: "Food has been successfully added" });
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }

    },


    getFoodById: async (req, res) => {
        const id = req.params.id;
        try {
            const food = await Food.findById(id);
            res.status(200).json({ status: true, message: food });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    getRandomFood: async (req, res) => {
        const code = req.params.code;
        try {
            let food;
            if (code) {
                food = await Food.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } },
                ]);
            }
            if (food.length == 0) {
                food = await Food.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } },
                ]);
            }

            res.status(200).json({ status: true, message: food });

        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    },
    getFoodByRestaurant: async (req, res) => {
        const id = req.params.id;
        try {
            const foods = await Food.findById({ restaurant: id });
            res.status(200).json({ status: true, message: foods });
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    },
}