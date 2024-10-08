const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller")

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.createOne);
router.post('/addItem', controller.addItem);
router.post('/:id/validateOrder', controller.validateOrder);
router.put('/:id', controller.updateOne);
router.delete('/:id', controller.deleteOne);

module.exports = router;