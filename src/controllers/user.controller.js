const User = require('../models/user.model');

// Récupérer tous les utilisateurs
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
};

// Récupérer un utilisateur par ID
const getOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
    }
};

const getUserByEmailOrName = async (req, res) => {
    try {
        const searchType = req.params.searchType;

        let filter
        if (searchType === "name") {
            filter = {name: req.params.value}
        } else if (searchType === "email") {
            filter = {email: req.params.value}
        }

        const user = await User.find(filter);

        if (!user) {
            return res.status(404).json({message: 'Utilisateur non trouvé via nom ou email'});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération de l\'utilisateur',
            error,
        });
    }
};


const getAllClient = async (req, res) => {
    try {
        const users = await User.find({role: 'client'})
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la récupération de l\'utilisateur', error});
    }
};

const getAllArtisan = async (req, res) => {
    try {
        const users = await User.find({role: 'artisan'})
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la récupération des artisan', error});
    }
};

const getAllCompany = async (req, res) => {
    try {
        const companies = await User.distinct('company');

        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des entreprises',
            error,
        });
    }
};

const getAllArtisansByRating = async (req, res) => {
    try {
        const artisans = await User.find({role: 'artisan'}).sort({rating: -1});

        res.status(200).json(artisans);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({
            message: 'Erreur lors de la récupération des artisans',
            error,
        });
    }
};

const getNewArtisans = async (req, res) => {
    try {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const artisans = await User.find({
            role: 'artisan',
            created_at: {$gte: lastMonth}
        }).sort({created_at: -1});

        res.status(200).json(artisans);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des artisans créés le dernier mois',
            error,
        });
    }
};


// Créer un utilisateur
const createOne = async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
};

// Mettre à jour un utilisateur
const updateOne = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!updatedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
    }
};

const updateProfilePic = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        user.profile_pic = req.file.path;
        await user.save();

        res.status(200).json({
            message: 'Photo de profil mise à jour avec succès',
            user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la photo de profil', error });
    }
}

// Supprimer un utilisateur
const deleteOne = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
};

module.exports = {
    getAll, getOne, createOne, updateOne, deleteOne, updateProfilePic, getAllArtisansByRating,
    getNewArtisans, getAllClient, getAllArtisan, getAllCompany, getUserByEmailOrName
};
