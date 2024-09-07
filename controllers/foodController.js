const Food = require('../models/Food');


module.exports = {
    // Todo Add Food
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
    // Todo Get Food By Id 
    getFoodById: async (req, res) => {
        const id = req.params.id;
        try {
            const food = await Food.findById(id);
            res.status(200).json({ status: true, food });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    // Todo Get All Food By Code
    getAllFoodByCode: async (req, res) => {
        const code = req.query.code;
        try {
            const foodList = await Food.find({ code: code });
            return res.status(200).json({ status: true, foodList });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    // Todo Get Random Food
    getRandomFood: async (req, res) => {
        const code = req.query.code;
        try {
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
    // Todo Get Food By Restaurant 
    getFoodsByRestaurant: async (req, res) => {
        const id = req.params.id;
        try {
            const foods = await Food.find({ restaurant: id });
            res.status(200).json({ status: true, foods });
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    },
    // Todo Get Food By Category And Postal Code
    getFoodByCategoryAndCode: async (req, res) => {
        const category = req.query.category;
        const code = req.query.code;
        try {
            const foods = await Food.aggregate([
                { $match: { category: category, code: code, isAvailable: true } },
                { $project: { __v: 0 } },
            ]);

            // Only send one response based on whether foods are found or not
            if (foods.length === 0) {
                return res.status(200).json({ status: true, foods: [] });
            }

            res.status(200).json({ status: true, foods });
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    },
    // Todo Search Food
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
    // Todo Get Random Food By Category And Code
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