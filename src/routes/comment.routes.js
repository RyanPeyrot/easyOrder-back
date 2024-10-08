const express = require("express");
const router = express.Router();
const controller = require("../controllers/comment.controller")

router.get('/', controller.getAll);
router.get('/:userType/:userId', controller.getReceivedSentComment);
router.get('/:id', controller.getOne);
router.post('/', controller.createOne);
router.put('/:id', controller.updateOne);
router.delete('/:id', controller.deleteOne);

module.exports = router;
