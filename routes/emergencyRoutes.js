const express = require("express");
const router = express.Router();
const emergencyController = require("../controllers/emergencyController");

router.post("/call", emergencyController.makeEmergencyCall);
router.post("/notify", emergencyController.notifyContacts);

module.exports = router;
