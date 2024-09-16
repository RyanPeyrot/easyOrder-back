const express = require("express");
const router = express.Router();
const controller = require("../controllers/payments.controller")

router.get("/",controller.getAll)

module.exports = router;