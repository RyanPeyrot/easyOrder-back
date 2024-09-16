const Order = require('../models/order.model');

// Contrôleur pour récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des orders', error });
    }
};

const createOne = async (req,res) => {
    try {
        const data = req.body;
        const document = new Order(data);
        await document.save();
        res.status(201).json(document);
    } catch (error){
        res.status(500).json({ message: 'Erreur lors de la création des orders', error });
    }
}

module.exports = {getAll,createOne}