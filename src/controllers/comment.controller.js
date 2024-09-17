const Comment = require('../models/comment.model');

// Récupérer tous les utilisateurs
const getAll = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commentaires', error });
    }
};

// Récupérer un utilisateur par ID
const getOne = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Commentaire non trouvé' });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du commentaire', error });
    }
};

// Créer un utilisateur
const createOne = async (req, res) => {
    try {
        const data = req.body;
        const newComment = new Comment(data);
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du commentaire', error });
    }
};

// Mettre à jour un utilisateur
const updateOne = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedComment) return res.status(404).json({ message: 'Commentaire non trouvé' });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du commentaire', error });
    }
};

// Supprimer un utilisateur
const deleteOne = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) return res.status(404).json({ message: 'Commentaire non trouvé' });
        res.status(200).json({ message: 'Commentaire supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du commentaire', error });
    }
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
