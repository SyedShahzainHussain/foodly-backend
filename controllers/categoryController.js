const Category = require("../models/Category");


module.exports = {
    createCategory: async (req, res) => {
        const newCateogry = new Category(req.body);
        try {
            await newCateogry.save();
            res.status(201).json({ status: true, message: "Category created successfully" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    getAllCategories: async (req, res) => {
        try {
            const category = await Category.find({ title: { $ne: "More" } }, { __v: 0 });
            res.status(200).json({ status: true, category });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    getRandomCategories: async (req, res) => {
        try {
            let category = await Category.aggregate([
                { $match: { value: { $ne: "more" } } },
                { $sample: { size: 4 } }
            ]);

            const moreCategory = await Category.findOne({ value: "more" }, { __v: 0 });

            if (moreCategory) {
                category.push(moreCategory);
            }
            res.status(200).json({ status: true, category });

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
}