const User = require('../models/user.model');
const {Company} = require('../models/company.model');
require('dotenv').config();
const axios = require('axios');

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

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Trouver l'utilisateur par email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'Utilisateur non trouvé'});
        }

        // Comparer le mot de passe en clair avec le mot de passe haché dans la base
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({message: 'Mot de passe incorrect'});
        }

        res.status(200).json({message: 'Connexion réussie', user: user});
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la connexion',
            error,
        });
    }
};

const addCompany = async (req, res) => {
    try {
        const siretNumber = req.body.siret;
        const userId = req.body._id;
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');

        const date = `${yyyy}-${mm}-${dd}`;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message: 'Utilisateur non trouvé'});
        } else if (user.role !== "artisan") {
            return res.status(403).json({message: 'Utilisateur non artisan'});
        }

        const fullCompany = (await axios
            .get(`https://api.insee.fr/entreprises/sirene/V3.11/siret/${siretNumber}?date=${date}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.SIREN_API_TOKEN}`
                }
            })).data;

        if (fullCompany.header.statut !== 200) {
            return res.status(fullCompany.header.statut).json({
                message: fullCompany.header.message
            })
        }

        const company = new Company({
            siren: fullCompany.etablissement.siren,
            siret: fullCompany.etablissement.siret,
            date_creation: fullCompany.etablissement.dateCreationEtablissement,
            denomination: fullCompany.etablissement.uniteLegale.denominationUniteLegale,
            categorie_entreprise: fullCompany.etablissement.uniteLegale.categorieJuridiqueUniteLegale,
            activitite_principale_legale: fullCompany.etablissement.uniteLegale.activitePrincipaleUniteLegale,
            adresse_etablissement: {
                typeVoieEtablissement: fullCompany.etablissement.adresseEtablissement.typeVoieEtablissement,
                libelleVoieEtablissement: fullCompany.etablissement.adresseEtablissement.libelleVoieEtablissement,
                codePostalEtablissement: fullCompany.etablissement.adresseEtablissement.codePostalEtablissement,
                libelleCommuneEtablissement: fullCompany.etablissement.adresseEtablissement.libelleCommuneEtablissement
            }
        })

        const updatedUser = await User.findByIdAndUpdate(userId, {company: company}, {new: true, runValidators: true});

        res.status(200).json({
            message: "Compagnie de l'utilisateur mis à jour",
            company: company,
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de l\'ajout de l\'entreprise',
            error,
        });
    }
}

const updateCompanyPic = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'Utilisateur non trouvé'});
        }
        if (user.role !== "artisan") {
            return res.status(403).json({message: 'Utilisateur non authorisé'});
        }
        const company = user.company;
        if (!company) {
            return res.status(404).json({message: 'Entreprise non trouvée'});
        }

        // Vérifier si des images ont été uploadées
        if (req.files.profile_pic) {
            company.profile_pic = req.files.profile_pic[0].path;
        }

        if (req.files.banner_pic) {
            company.banner_pic = req.files.banner_pic[0].path;  // Mettre à jour l'URL de la bannière
        }

        const updatedUser = await User.findByIdAndUpdate(userId,
            {company: company}, {new: true, runValidators: true});

        res.status(200).json({message: 'Images mises à jour avec succès', user: updatedUser});
    } catch (error) {
        console.error('Erreur lors de l\'upload des images:', error);
        res.status(500).json({message: 'Erreur lors de l\'upload des images'});
    }
};


module.exports = {
    getAll, getOne, createOne, updateOne, deleteOne, updateProfilePic, getAllArtisansByRating,
    getNewArtisans, getAllClient, getAllArtisan, getAllCompany, getUserByEmailOrName, loginUser,
    addCompany, updateCompanyPic
};
