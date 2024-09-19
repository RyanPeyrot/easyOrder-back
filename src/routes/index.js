const express = require("express");
const router = express.Router();

const messageRouter = require('./message.routes');
const orderRouter = require('./order.routes');
const orderItemRouter = require('./order_item.routes');
const paymentRouter = require('./payments.routes');
const productRouter = require('./product.routes');
const userRouter = require('./user.routes');
const favoriteProductRouter = require('./favorite_product.routes');
const favoriteVendorRouter = require('./favorite_vendor.routes');
const productCategory = require('./category.routes');
const commentRouter = require('./comment.routes');

router.use('/message',messageRouter);
router.use('/order',orderRouter);
router.use('/order_item',orderItemRouter);
router.use('/payment',paymentRouter);
router.use('/product',productRouter);
router.use('/user',userRouter);
router.use('/favoriteVendor',favoriteVendorRouter);
router.use('/favoriteProduct',favoriteProductRouter);
router.use('/category',productCategory);
router.use('/comment',commentRouter);

module.exports = router;