const Payment = require('../models/payment.model');

// Récupérer tous les paiements
const getAll = async (req, res) => {
    try {
        const payments = await Payment.find().populate('order_id');
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des paiements', error });
    }
};

// Récupérer un paiement par ID
const getOne = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('order_id');
        if (!payment) return res.status(404).json({ message: 'Paiement non trouvé' });
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du paiement', error });
    }
};

// Créer un paiement
const createOne = async (req, res) => {
    try {
        const data = req.body;
        const newPayment = new Payment(data);
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du paiement', error });
    }
};

// Mettre à jour un paiement
const updateOne = async (req, res) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPayment) return res.status(404).json({ message: 'Paiement non trouvé' });
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du paiement', error });
    }
};

// Supprimer un paiement
const deleteOne = async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) return res.status(404).json({ message: 'Paiement non trouvé' });
        res.status(200).json({ message: 'Paiement supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du paiement', error });
    }
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
