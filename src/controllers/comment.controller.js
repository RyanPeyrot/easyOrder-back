const Comment = require('../models/comment.model');
const User = require('../models/user.model');
const {isSDAMUnrecoverableError} = require("mongodb/src/error");

const getAll = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commentaires', error });
    }
};


const getOne = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Commentaire non trouvé' });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du commentaire', error });
    }
};


const createOne = async (req, res) => {
    try {
        const data = req.body;
        const newComment = new Comment(data);
        await newComment.save()

        const recipient = await User.findById(data.recipient_id);
        if (!recipient) {
            return res.status(404).json({ message: 'Utilisateur destinataire non trouvé' });
        }

        const newRateAmount = recipient.rate_amount + 1;
        const newRating = ((recipient.rating * recipient.rate_amount) + data.rate) / newRateAmount;

        recipient.rate_amount = newRateAmount;
        recipient.rating = newRating;

        await recipient.save();

        res.status(201).json({
            message: 'Commentaire créé et note mise à jour avec succès',
            newComment,
            recipient
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du commentaire et de la mise à jour de la note', error });
    }
};

const updateOne = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedComment) return res.status(404).json({ message: 'Commentaire non trouvé' });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du commentaire', error });
    }
};

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
