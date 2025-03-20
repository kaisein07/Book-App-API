const Author = require('../models/author')

// Obtenir tous les auteurs
exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Obtenir un auteur par ID
exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: "Auteur non trouvé" });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouvel auteur
exports.createAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body;
        const newAuthor = new Author({ name, bio });
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un auteur
exports.updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAuthor) return res.status(404).json({ message: "Auteur non trouvé" });
        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un auteur
exports.deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) return res.status(404).json({ message: "Auteur non trouvé" });
        res.status(200).json({ message: "Auteur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
