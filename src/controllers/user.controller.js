const User = require('../models/user.model');

// Contrôleur pour récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des users', error });
    }
};