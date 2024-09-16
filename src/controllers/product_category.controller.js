const ProductCategory = require('../models/product_category.model');

// Contrôleur pour récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const categories = await ProductCategory.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des categories', error });
    }
};

const createOne = async (req,res) => {
    try {
        const data = req.body;
        const document = new ProductCategory(data);
        await document.save();
        res.status(201).json(document);
    } catch (error){
        res.status(500).json({ message: 'Erreur lors de la création des categories', error });
    }
}

module.exports = {getAll,createOne}