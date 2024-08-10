const ratingController = require("../controllers/ratingController");
const router = require("express").Router();


router.post("/",ratingController.addRating);

router.get("/",ratingController.checkUserRating);


module.exports = router;