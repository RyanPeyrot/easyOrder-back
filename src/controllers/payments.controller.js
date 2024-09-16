const Payment = require('../models/payment.model');

// Contrôleur pour récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des payments', error });
    }
};