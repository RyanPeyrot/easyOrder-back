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