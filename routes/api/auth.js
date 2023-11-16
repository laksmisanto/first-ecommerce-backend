const express = require("express");
const registrationController = require("../../controller/registrationController");
const router = express.Router();

router.use("/registration", registrationController);

module.exports = router;
