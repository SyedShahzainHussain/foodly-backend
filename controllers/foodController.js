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
            res.status(200).json({ status: true, food });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRandomFood: async (req, res) => {
        try {
            const code = req.params.code;
            let randomFoodList = [];
            if (code) {
                randomFoodList = await Food.aggregate([
                    { $match: { code: code, } },
                    { $sample: { size: 3 } },
                    { $project: { __v: 0 } },
                ]);
            }
            if (!randomFoodList.length) {
                randomFoodList = await Food.aggregate([
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } },
                ]);
            }
            if (randomFoodList.length) {
                res.status(200).json({ status: true, randomFoodList });
            } else {
                res.status(404).json({ status: false, message: "No Food Found" });

            }

        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    },
    getFoodsByRestaurant: async (req, res) => {
        const id = req.params.id;
        try {
            const foods = await Food.find({ restaurant: id });
            res.status(200).json({ status: true, foods });
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    },
    getFoodByCategoryAndCode: async (req, res) => {
        const { category, code } = req.params;
        try {
            const foods = await Food.aggregate([
                { $match: { category: category, code: code, isAvailable: true } },
                { $project: { __v: 0 } },
            ]);

            if (foods.length === 0) {
                res.status(200).json({ status: true, message: [] });
            }
            res.status(200).json({ status: true, foods });

        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    },
    searchFoods: async (req, res) => {
        const { search } = req.params;
        try {
            const result = await Food.aggregate([
                {
                    $search: {
                        index: "foods",
                        text: {
                            query: search,
                            path: {
                                wildcard: "*",
                            }
                        }
                    }
                }
            ]);
            res.status(200).json({ status: true, result });
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    },
    getRandomFoodsByCategoryAndCode: async (req, res) => {
        const { category, code } = req.params;
        try {
            let foods = [];
            foods = await Food.aggregate([
                { $match: { category: category, code: code, isAvailabe: true } },
                { $sample: { size: 10 } },
            ]);

            if (!foods || foods.length === 0) {
                foods = await Food.aggregate([
                    { $match: { code: code, isAvailabe: true } },
                    { $sample: { size: 10 } },
                ]);
            } else if (!foods || foods.length === 0) {
                foods = await Food.aggregate([
                    { $match: { isAvailabe: true } },
                    { $sample: { size: 10 } },
                ]);
            }
            res.status(200).json({ status: true, foods });

        } catch (e) {
            res.status(500).json({ status: false, message: e.message });

        }
    },
}