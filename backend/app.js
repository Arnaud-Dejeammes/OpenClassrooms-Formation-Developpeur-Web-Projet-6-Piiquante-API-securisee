// Création d'une application Express (importation du module)
const express = require("express");
// const cors = require("cors") // Voir si cors est nécessaire pour une API en local

// Appel de la méthode pour l'application
const app = express();

// Gestion de la requête POST (middleware du framework Express : prend les requêtes avec le Content-Type application/json, et met le body sur l'objet request)
// Analyse du corps de la requête
// Remplace body-parser
app.use(express.json());

const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/users");

const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.nnpm2mg.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB on!"))
    .catch(() => console.log("MongoDB failed!"));

// app.use(express.urlencoded({ extended: true}));

// Middlewares (fonction dans une application Express avec requête et réponse)

// Middleware généraliste de gestion des origines différentes
app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*"); // Applicable à toutes les routes
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    // next();
});

app.use("/api/sauces", sauceRoutes);
app.use("/api/users", userRoutes);

// Exportation de la constante pour une utilisation à partir d'autres fichiers
module.exports = app; // Supprimer ? Vérifier si son export est utile à d'autres fichiers.

// Middlewares de test
// app.use((request, response, next) => {
//     console.log("Test");
//     next();
// });

// app.use((request, response, next) => {
//     response.status(201);
//     next();
// });

// app.use((request, response, next) => {
//     response.json({
//         message: "Bip... bip... bip... réponse reçue."
//     });
//     next();
// })

// app.use((request, response) => {
//     console.log("Réponse envoyée.")
// });