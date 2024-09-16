const express = require("express");
const router = express.Router();

const messageRouter = require('./message.routes');
const orderRouter = require('./order.routes');
const orderItemRouter = require('./order_item.routes');
const paymentRouter = require('./payments.routes');
const productRouter = require('./product.routes');
const userRouter = require('./user.routes');
const favoriteRouter = require('./favorite.routes');

router.use('/message',messageRouter);
router.use('/order',orderRouter);
router.use('/order_item',orderItemRouter);
router.use('/payment',paymentRouter);
router.use('/product',productRouter);
router.use('/user',userRouter);
router.use('/favorite',favoriteRouter);

module.exports = router;