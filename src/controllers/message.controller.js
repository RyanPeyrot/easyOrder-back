const Message = require('../models/message.model');

// Récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des messages', error });
    }
};

// Récupérer un message par ID
const getOne = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ message: 'Message non trouvé' });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du message', error });
    }
};

// Créer un message
const createOne = async (req, res) => {
    try {
        const data = req.body;
        const newMessage = new Message(data);
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du message', error });
    }
};

// Mettre à jour un message
const updateOne = async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMessage) return res.status(404).json({ message: 'Message non trouvé' });
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du message', error });
    }
};

// Supprimer un message
const deleteOne = async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) return res.status(404).json({ message: 'Message non trouvé' });
        res.status(200).json({ message: 'Message supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du message', error });
    }
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
