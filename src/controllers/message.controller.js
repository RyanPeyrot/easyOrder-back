const Message = require('../models/message.model');

// Contrôleur pour récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des messages', error });
    }
};

const createOne = async (req,res) => {
    try {
        const data = req.body;
        const document = new Message(data);
        await document.save();
        res.status(201).json(document);
    } catch (error){
        res.status(500).json({ message: 'Erreur lors de la création des messages', error });
    }
}

module.exports = {getAll,createOne}