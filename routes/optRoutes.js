const express = require('express');
const router = express.Router();

const {createNewAccessCode, validateAccessCode} = require("../controllers/otpControllers");

router.post("/getCode/:to", createNewAccessCode);
router.post("/verifyCode", validateAccessCode);

module.exports = router;