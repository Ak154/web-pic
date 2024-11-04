const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userControllers");
const upload = require("../middleware/upload");

router.post("/register", upload.single("profile_pic"), controllers.register)
router.post("/login", controllers.login);

module.exports = router;