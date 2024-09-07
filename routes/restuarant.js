const router = require("express").Router();
const categoryController = require("../controllers/resturantController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");


router.post("/", verifyTokenAndAuthorization, categoryController.createRestaurant);

router.get("/", categoryController.getRandomRestaurant);

router.get("/all/", categoryController.getAllNearByRestaurant);

router.get("/byId/", categoryController.getRestaurantById);


module.exports = router;