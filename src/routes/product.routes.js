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
        const productId = req.params.id;  // Récupérer l'ID du produit depuis les paramètres de la requête

        if (!req.currentFileIndex) {
            const product = await Product.findById(productId);
            const existingPictures = product ? product.pictures : [];
            req.currentFileIndex = existingPictures.length + 1;  // Le prochain numéro est basé sur le nombre d'images actuelles
        }
        const currentPictureIndex = req.currentFileIndex;
        req.currentFileIndex++;

        return {
            folder: `product_picture/${productId}`,  // Dossier dans Cloudinary
            public_id: `${productId}_picture_${currentPictureIndex}`,  // Nommer l'image avec l'ID et un numéro incrémenté
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
router.post('/:id/addPictures', controller.checkImageLimit, upload, controller.addPictures);
router.post('/:id/deletePicture', controller.deletePicture);
router.put('/:id', controller.updateOne);
router.delete('/:id', controller.deleteOne);

module.exports = router;