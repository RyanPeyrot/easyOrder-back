const Category = require('../models/category.model');

// Récupérer toutes les catégories
const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des catégories', error });
    }
};

// Récupérer une catégorie par ID
const getOne = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Catégorie non trouvée' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie', error });
    }
};

// Créer une catégorie
const createOne = async (req, res) => {
    try {
        const data = req.body;
        const newCategory = new Category(data);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la catégorie', error });
    }
};

// Mettre à jour une catégorie
const updateOne = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {new: true});
        if (!updatedCategory) return res.status(404).json({ message: 'Catégorie non trouvée' });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie', error });
    }
};

// Supprimer une catégorie
const deleteOne = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: 'Catégorie non trouvée' });
        res.status(200).json({ message: 'Catégorie supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie', error });
    }
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
