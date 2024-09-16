const Payment = require('../models/payment.model');

// Contrôleur pour récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const payments = await Payment.find({});
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des payments', error });
    }
};

const createOne = async (req,res) => {
    try {
        const data = req.body;
        const document = new Payment(data);
        await document.save();
        res.status(201).json(document);
    } catch (error){
        res.status(500).json({ message: 'Erreur lors de la création des payments', error });
    }
}

module.exports = {getAll,createOne}