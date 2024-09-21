const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller")
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const Product = require("../models/product.model");


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const productId = req.params.id;  // Récupérer l'ID du produit

        // Récupérer le produit pour compter les images déjà présentes
        const product = await Product.findById(productId);
        const existingPictures = product ? product.pictures.length : 0;

        // Utiliser un compteur spécifique pour chaque fichier envoyé dans la même requête
        const fileIndex = req.fileIndex || existingPictures + 1; // Commence après le nombre d'images existantes

        req.fileIndex = fileIndex + 1; // Incrémente pour le prochain fichier

        return {
            folder: `product_picture/${productId}`,  // Dossier Cloudinary
            public_id: `${productId}_picture_${fileIndex}`,  // Nommer l'image avec un index unique
            allowed_formats: ['jpg', 'png', 'jpeg'],  // Formats autorisés
        };
    },
});


const upload = multer({storage}).array('pictures', 10);

router.get('/', controller.getAll);
router.get('/newProduct', controller.getNewProducts)
router.get('/userProduct/:userId', controller.getUserProduct)
router.get('/:id', controller.getOne);
router.post('/', controller.createOne);
router.post('/:id/addPictures', upload, controller.addPictures);
router.post('/:id/deletePicture', controller.deletePicture);
router.put('/:id', controller.updateOne);
router.delete('/:id', controller.deleteOne);

module.exports = router;