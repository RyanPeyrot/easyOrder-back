const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller")

router.get("/",controller.getAll)

module.exports = router;