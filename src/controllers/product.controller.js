const Product = require('../models/product.model');

// Contrôleur pour récupérer tous les messages
const getAll = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des products', error });
    }
};

const createOne = async (req,res) => {
    try {
        const data = req.body;
        const document = new Product(data);
        await document.save();
        res.status(201).json(document);
    } catch (error){
        res.status(500).json({ message: 'Erreur lors de la création des products', error });
    }
}

module.exports = {getAll,createOne}