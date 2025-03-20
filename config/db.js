const mongoose = require('mongoose');

const dataBase = async () => {
        await 
        mongoose.connect('mongodb+srv://babioabdoul93:babio@cluster0.7z8ag.mongodb.net/BooksDB')
          .then(() => console.log("MongoDB connecté"))
          .catch(err => console.error("Erreur de connexion", err));
}

1
module.exports = dataBase 