const ProductCategory = require('../models/product.model');

// Contrôleur pour récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const categorys = await ProductCategory.find();
        res.status(200).json(categorys);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des categorys', error });
    }
};

const createOne = async (req,res) => {
    try {
        const data = req.body;
        const document = new ProductCategory(data);
        await document.save();
        res.status(201).json(document);
    } catch (error){
        res.status(500).json({ message: 'Erreur lors de la création des categorys', error });
    }
}

module.exports = {getAll,createOne}