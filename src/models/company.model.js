const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const adresseSchema = new mongoose.Schema({
    typeVoieEtablissement: {type: String, required: true},
    libelleVoieEtablissement: {type: String, required: true},
    codePostalEtablissement: {type: String, required: true},
    libelleCommuneEtablissement: {type: String, required: true}
});

const companySchema = new Schema({
    siren: {
        type: String
    },
    siret: {
        type: String
    },
    date_creation: {
        type: String
    },
    denomination: {
        type: String
    },
    categorie_entreprise: {
        type: String
    },
    activitite_principale_legale: {
        type: String
    },
    adresse_etablissement: {
        type: adresseSchema
    },
    etat: {
        type: String,
        enum: ['refusé', 'en attente', 'validé'],
        default: 'en attente'
    },
    profile_pic: {
        type: String,
        default: "https://res.cloudinary.com/dt1ksv65x/image/upload/v1726759886/company/profil_pic/company_default_pic.png"
    },
    banner_pic: {
        type: String,
        default: "https://res.cloudinary.com/dt1ksv65x/image/upload/t_Banner 16:9/v1726759860/company/banner_pic/company_default_banner.jpg"
    }
});


// Modèle de la compagnie
const Company = mongoose.model('Company', companySchema);

// Exporter à la fois le schéma et le modèle
module.exports = {companySchema, Company};