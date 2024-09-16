const express = require("express");
const router = express.Router();
const controller = require("../controllers/order_item.controller")

router.get("/",controller.getAll)

module.exports = router;