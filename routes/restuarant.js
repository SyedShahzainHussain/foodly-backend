const router = require("express").Router();
const categoryController = require("../controllers/resturantController");



router.post("/",categoryController.createRestaurant);

router.get("/:code",categoryController.getRandomRestaurant);

router.get("/all/:code",categoryController.getAllNearByRestaurant);

router.get("/byId/:id",categoryController.getRestaurantById);


module.exports = router;