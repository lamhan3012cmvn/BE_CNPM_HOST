const express = require('express');
const productRoute = require('./productRoute');
const authRoute = require('./authRoute');
const router = express.Router();

router.use("/product", productRoute);
router.use("/auth", authRoute);

module.exports = router;