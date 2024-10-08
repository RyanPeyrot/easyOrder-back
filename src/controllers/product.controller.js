const Product = require('../models/product.model');
const cloudinary = require("../config/cloudinary");
const getAll = async (req, res) => {
    try {
        const products = await Product.find().populate('categories');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
    }
};

const getOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categories');
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du produit', error });
    }
};

const getUserProduct = async (req, res) => {
    try {
        const product = await Product.find({artisan_id: req.params.userId}).populate('categories');
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
        }).sort({created_at: -1}).populate('categories');

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
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            ...req.body,
            updated_at: Date.now()
        }, {new: true});
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

const addPictures = async (req, res) => {
    try {
        // Les fichiers uploadés sont accessibles via req.files
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({message: 'Aucune image téléchargée'});
        }
        const productId = req.params.id;

        // Trouver le produit existant
        let product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({message: 'Produit non trouvé'});
        }

        // Vérifier le nombre actuel d'images
        if (product.pictures.length + req.files.length > 10) {
            await Promise.all(req.files.map(async (file) => {
                const publicId = file.filename; // Récupérer le public_id de l'image
                await cloudinary.uploader.destroy(publicId); // Supprimer l'image de Cloudinary
            }));

            return res.status(400).json({message: 'Le produit ne peut pas avoir plus de 10 images.'});
        }

        const uploadedFiles = req.files.map(file => ({
            url: file.path,
            _id: file.filename
        }));

        product = await Product.findByIdAndUpdate(productId,
            {$push: {pictures: {$each: uploadedFiles}}, updated_at: Date.now()},  // Pousser chaque lien dans le tableau "pictures"
            {new: true});

        res.status(200).json({message: 'Images ajoutées avec succès', product});
    } catch (error) {
        console.error('Erreur lors de l\'upload des images:', error);
        res.status(500).json({message: 'Erreur lors de l\'upload des images'});
    }
};

const deletePicture = async (req, res) => {
    try {
        const productId = req.params.id;
        const publicId = req.body.picturesId;  // Le public_id de l'image à supprimer

        // Supprimer l'image de Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // Supprimer le lien de l'image dans MongoDB
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {$pull: {pictures: {_id: publicId}}},  // Supprimer l'objet image avec ce public_id
            {new: true}
        );

        res.status(200).json({message: 'Image supprimée avec succès', product: updatedProduct});
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'image:', error);
        res.status(500).json({message: 'Erreur lors de la suppression de l\'image'});
    }
};

module.exports = {
    getAll, getOne, createOne, updateOne, deleteOne, getUserProduct, getNewProducts, addPictures,
    deletePicture
};
