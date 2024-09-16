const Favorite = require('../models/favorite.model');

// Contrôleur pour récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const favorite = await Favorite.find({});
        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des favoris', error });
    }
};

const createOne = async (req,res) => {
    try {
        const data = req.body;
        const document = new Favorite(data);
        await document.save();
        res.status(201).json(document);
    } catch (error){
        res.status(500).json({ message: 'Erreur lors de la création des favoris', error });
    }
}

module.exports = {getAll,createOne}