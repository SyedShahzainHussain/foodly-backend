const addressController = require("../controllers/addressController");
const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, addressController.addAddress);

router.get("/default", verifyTokenAndAuthorization, addressController.getDefaultAddress);

router.get("/all", verifyTokenAndAuthorization, addressController.getAddress);

router.delete("/:id", verifyTokenAndAuthorization, addressController.deleteAddress);

router.patch("/default/:id", verifyTokenAndAuthorization, addressController.setAddressDefault);


module.exports = router;