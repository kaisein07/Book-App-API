# Book App API

## Description
Book App API est une API RESTful construite avec Node.js, Express et MongoDB. Elle permet de gérer une bibliothèque de livres avec des fonctionnalités de création, lecture, mise à jour et suppression (CRUD). L'authentification est assurée via JWT, permettant un accès sécurisé à certaines routes.

---

## Technologies utilisées
- Node.js
- Express.js
- MongoDB avec Mongoose
- JSON Web Token (JWT) pour l'authentification
- Dotenv pour la gestion des variables d'environnement
- Bcrypt pour le hachage des mots de passe

---

## Installation

1. **Cloner le projet :**
   ```sh
   git clone <repo_url>
   cd book-app-api
   ```
2. **Installer les dépendances :**
   ```sh
   npm install
   ```
3. **Configurer l'environnement :**
   - Créer un fichier `.env` à la racine et ajouter les variables suivantes :
     ```env
     PORT=5000
     MONGO_URI=<Votre_URL_MongoDB>
     JWT_SECRET=<Votre_Secret_JWT>
     ```
4. **Démarrer le serveur :**
   ```sh
   npm start
   ```

---

## Structure du projet

📂 book-app-api  
│-- 📂 models  
│   │-- 📄 Book.js  
│   │-- 📄 Author.js  
│   │-- 📄 User.js  
│-- 📂 routes  
│   │-- 📄 bookRoutes.js  
│   │-- 📄 authorRoutes.js  
│   │-- 📄 authRoutes.js  
│-- 📂 controllers  
│   │-- 📄 bookController.js  
│   │-- 📄 authorController.js  
│   │-- 📄 authController.js  
│-- 📂 middleware  
│   │-- 📄 authMiddleware.js  
│-- 📂 config  
│   │-- 📄 db.js  
│-- 📄 server.js  
│-- 📄 .env  
│-- 📄 package.json  
│-- 📄 README.md  

---

## Routes API

### Authentification

- **Créer un compte (inscription)**
  - `POST /api/auth/register`
  - Body JSON :
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

- **Se connecter**
  - `POST /api/auth/login`
  - Body JSON :
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
  - Réponse JSON (avec token) :
    ```json
    {
      "token": "eyJhbGciOiJI..."
    }
    ```

### Livres (Books)

- **Afficher tous les livres (accessible à tous)**
  - `GET /api/books`
- **Créer un livre (nécessite authentification)**
  - `POST /api/books`
  - Headers : `Authorization: Bearer <token>`
- **Mettre à jour un livre (authentification requise)**
  - `PUT /api/books/:id`
- **Supprimer un livre (authentification requise)**
  - `DELETE /api/books/:id`

### Auteurs (Authors)

- **Afficher tous les auteurs (accessible à tous)**
  - `GET /api/authors`
- **Créer un auteur (nécessite authentification)**
  - `POST /api/authors`
  - Headers : `Authorization: Bearer <token>`
- **Mettre à jour un auteur (authentification requise)**
  - `PUT /api/authors/:id`
- **Supprimer un auteur (authentification requise)**
  - `DELETE /api/authors/:id`

---

## Middleware d'authentification

Le fichier `authMiddleware.js` contient une fonction qui vérifie le token JWT pour protéger les routes sensibles.

```js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Accès refusé' });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token invalide' });
    }
};

module.exports = authMiddleware;
```

Ajout de la protection dans les routes :

```js
const { authMiddleware } = require('../middleware/authMiddleware');
router.post('/books', authMiddleware, bookController.createBook);
```

---

## Tests avec Postman

1. **Inscription**
   - Méthode : `POST`
   - URL : `http://localhost:5000/api/auth/register`
   - Body JSON : voir section *Créer un compte*

2. **Connexion**
   - Méthode : `POST`
   - URL : `http://localhost:5000/api/auth/login`
   - Body JSON : voir section *Se connecter*
   - Récupérer le token et l'ajouter dans les headers pour les requêtes sécurisées

3. **Créer un livre (auth requis)**
   - Méthode : `POST`
   - URL : `http://localhost:5000/api/books`
   - Headers : `Authorization: Bearer <token>`
   - Body JSON :
     ```json
     {
       "title": "Mon livre",
       "author": "Auteur ID",
       "publishedYear": 2024
     }
     ```

---



