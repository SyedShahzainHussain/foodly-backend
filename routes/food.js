const router = require("express").Router();
const food = require("../controllers/foodController");


router.post("/", food.addFood);

router.get("/recommendation/:code",food.getRandomFood)

router.get("/:id", food.getFoodById);

router.get("/restaurant-foods/:id",food.getFoodsByRestaurant);

router.get("/search/:search",food.searchFoods);

router.get("/:category/:code",food.getFoodByCategoryAndCode);




module.exports = router;    