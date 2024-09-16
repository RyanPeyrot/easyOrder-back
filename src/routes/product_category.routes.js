const express = require("express");
const router = express.Router();
const controller = require("../controllers/product_category.controller")

router.get("/",controller.getAll);

module.exports = router;