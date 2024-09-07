const router = require("express").Router();
const food = require("../controllers/foodController");
const { verifyVender } = require("../middleware/verifyToken");


router.post("/", verifyVender, food.addFood);

router.get("/recommendation/", food.getRandomFood)

router.get("/byCode/", food.getAllFoodByCode);

router.get("/:id", food.getFoodById);

router.get("/restaurant-foods/:id", food.getFoodsByRestaurant);

router.get("/search/:search", food.searchFoods);

router.get("/", food.getFoodByCategoryAndCode);





module.exports = router;    