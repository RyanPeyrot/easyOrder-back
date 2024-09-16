const express = require("express");
const router = express.Router();
const controller = require("../controllers/message.controller")

router.get("/",controller.getAll)

module.exports = router;