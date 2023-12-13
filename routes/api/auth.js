const express = require("express");
const registrationController = require("../../controller/registrationController");
const loginController = require("../../controller/loginController");
const matchOTP = require("../../controller/matchOtpController");
const router = express.Router();

router.use("/registration", registrationController);
router.use("/matchOTP", matchOTP);
router.use("/login", loginController);

module.exports = router;
