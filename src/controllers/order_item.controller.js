const OrderItem = require('../models/order_item.model');

// Récupérer tous les items de commande
const getAll = async (req, res) => {
    try {
        const orderItems = await OrderItem.find().populate('order_id').populate('product_id');
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des items de commande', error });
    }
};

// Récupérer un item de commande par ID
const getOne = async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id).populate('order_id').populate('product_id');
        if (!orderItem) return res.status(404).json({ message: 'Item de commande non trouvé' });
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'item de commande', error });
    }
};

// Créer un item de commande
const createOne = async (req, res) => {
    try {
        const data = req.body;
        const newOrderItem = new OrderItem(data);
        await newOrderItem.save();
        res.status(201).json(newOrderItem);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'item de commande', error });
    }
};

// Mettre à jour un item de commande
const updateOne = async (req, res) => {
    try {
        const updatedOrderItem = await OrderItem.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {new: true});
        if (!updatedOrderItem) return res.status(404).json({ message: 'Item de commande non trouvé' });
        res.status(200).json(updatedOrderItem);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'item de commande', error });
    }
};

// Supprimer un item de commande
const deleteOne = async (req, res) => {
    try {
        const deletedOrderItem = await OrderItem.findByIdAndDelete(req.params.id);
        if (!deletedOrderItem) return res.status(404).json({ message: 'Item de commande non trouvé' });
        res.status(200).json({ message: 'Item de commande supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'item de commande', error });
    }
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
