const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.get("/", verifyTokenAndAuthorization, userController.getUser);

router.delete("/", verifyTokenAndAuthorization, userController.deleteUser);

router.post("/verify/:otp", verifyTokenAndAuthorization, userController.verifyAccount);

router.post("/verify_phone/:phone", verifyTokenAndAuthorization, userController.verifyPhone);

module.exports = router;