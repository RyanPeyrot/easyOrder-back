const OrderItem = require('../models/order_item.model');

// Contrôleur pour récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const orderItems = await OrderItem.find();
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des order_items', error });
    }
};

const createOne = async (req,res) => {
    try {
        const data = req.body;
        const document = new OrderItem(data);
        await document.save();
        res.status(201).json(document);
    } catch (error){
        res.status(500).json({ message: 'Erreur lors de la création des order_items', error });
    }
}

module.exports = {getAll,createOne}