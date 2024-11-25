const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/profile", userController.getProfile);
router.post("/profile", userController.saveProfile);

module.exports = router;
