const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Order_item = require('../models/order_item.model');

const getAll = async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: 'items',
            populate: {
                path: 'product_id'
            }
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
    }
};

const getOne = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate({
            path: 'items',
            populate: {
                path: 'product_id'
            }
        });
        ;
        if (!order) return res.status(404).json({ message: 'Commande non trouvée' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la commande', error });
    }
};

const createOne = async (req, res) => {
    try {
        const data = req.body;
        const newOrder = new Order(data);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
    }
};

const updateOne = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Commande non trouvée' });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error });
    }
};

const deleteOne = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Commande non trouvée' });
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error });
    }
};

const addItem = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const product = await Product.findById(req.body.product_id);
        let order = await Order.findById(req.body.order_id);
        const quantity = req.body.quantity;

        if (!order) {
            order = new Order({
                user_id: userId,
            })

            await order.save()
        }

        const orderItem = new Order_item({
            order_id: order._id,
            product_id: product._id,
            price_in_cent: (product.price_in_cent * quantity),
            quantity: quantity
        })

        await orderItem.save();

        order = await Order.findByIdAndUpdate(order._id
            , {total_in_cent: (order.total_in_cent + orderItem.price_in_cent), $push: {items: orderItem}}
            , {new: true, runValidators: true})

        res.status(200).json({message: 'produits ajouter à la commande', order: order})

    } catch (error) {
        res.status(500).json({message: 'Erreur lors de l\'ajout d\'un item', error});
    }
}

module.exports = {getAll, getOne, createOne, updateOne, deleteOne, addItem};
