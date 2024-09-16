const User = require('../models/user.model');

// Contrôleur pour récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des users', error });
    }
};

const createOne = async (req,res) => {
    try {
        const data = req.body;
        const document = new User(data);
        await document.save();
        res.status(201).json(document);
    } catch (error){
        res.status(500).json({ message: 'Erreur lors de la création des users', error });
    }
}

module.exports = {getAll,createOne}