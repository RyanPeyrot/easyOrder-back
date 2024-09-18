const Product = require('../models/product.model');
const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
    }
};

const getOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du produit', error });
    }
};

const getUserProduct = async (req, res) => {
    try {
        const product = await Product.find({artisan_id: req.params.userId});
        if (!product) return res.status(404).json({message: 'Produit non trouvé'});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la récupération du produit', error});
    }
}

const getNewProducts = async (req, res) => {
    try {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const product = await Product.find({
            created_at: {$gte: lastMonth}
        }).sort({created_at: -1});

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des produits créés le dernier mois',
            error,
        });
    }
};

const createOne = async (req, res) => {
    try {
        const data = req.body;
        const newProduct = new Product(data);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du produit', error });
    }
};

const updateOne = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Produit non trouvé' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du produit', error });
    }
};

const deleteOne = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Produit non trouvé' });
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du produit', error });
    }
};

module.exports = {getAll, getOne, createOne, updateOne, deleteOne, getUserProduct, getNewProducts};
