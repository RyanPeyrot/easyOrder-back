const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller")
const multer = require('multer');
const cloudinary = require('../config/cloudinary');  // Importer la configuration de Cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const userId = req.params.id;  // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
        return {
            folder: 'profile_pictures',  // Dossier dans lequel les images sont stockées dans Cloudinary
            public_id: `${userId}_profile_picture`,  // Nommer l'image avec l'ID de l'utilisateur
            allowed_formats: ['jpg', 'png', 'jpeg'],  // Formats autorisés
        };
    },
});

const upload = multer({ storage });

router.get('/', controller.getAll);
router.get('/artisanByRate', controller.getAllArtisansByRating);
router.get('/artisans', controller.getAllArtisan);
router.get('/clients', controller.getAllClient);
router.get('/company', controller.getAllCompany);
router.get('/newArtisans', controller.getNewArtisans);
router.get('/:searchType/:value', controller.getUserByEmailOrName);
router.get('/:id', controller.getOne);
router.post('/', controller.createOne);
router.post('/login', controller.loginUser);
router.post('/:id/profile_pic', upload.single('profile_pic'), controller.updateProfilePic);
router.put('/:id', controller.updateOne);
router.delete('/:id', controller.deleteOne);

router.use((req, res, next) => {
    res.status(404).json({
        message: 'Page non trouvée',
    });
});

module.exports = router;