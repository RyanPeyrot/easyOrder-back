const Favorite = require('../models/favorite_vendor.model');

// Récupérer tous les favoris
const getAll = async (req, res) => {
    try {
        const favorites = await Favorite.find().populate('user_id').populate('vendor');
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des favoris', error });
    }
};

// Récupérer un favori par ID
const getOne = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id).populate('user_id').populate('products');
        if (!favorite) return res.status(404).json({ message: 'Favori non trouvé' });
        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du favori', error });
    }
};

// Créer un favori
const createOne = async (req, res) => {
    try {
        const data = req.body;
        const newFavorite = new Favorite(data);
        await newFavorite.save();
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du favori', error });
    }
};

// Mettre à jour un favori
const updateOne = async (req, res) => {
    try {
        const updatedFavorite = await Favorite.findByIdAndUpdate(req.params.id, {
            ...req.body,
            updated_at: Date.now
        }, {new: true});
        if (!updatedFavorite) return res.status(404).json({ message: 'Favori non trouvé' });
        res.status(200).json(updatedFavorite);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du favori', error });
    }
};

// Supprimer un favori
const deleteOne = async (req, res) => {
    try {
        const deletedFavorite = await Favorite.findByIdAndDelete(req.params.id);
        if (!deletedFavorite) return res.status(404).json({ message: 'Favori non trouvé' });
        res.status(200).json({ message: 'Favori supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du favori', error });
    }
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
