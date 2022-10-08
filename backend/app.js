// Création d'une application Express (importation du module)
const express = require("express");
// const cors = require("cors") // Voir si cors est nécessaire pour une API en local

// Appel de la méthode pour l'application
const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true}));

// Middlewares (fonction dans une application Express avec requête et réponse)
app.use((request, response, next) => {
    console.log("Test");
    next();
});

app.use((request, response, next) => {
    response.status(201);
    next();
});

app.use((request, response, next) => {
    response.json({
        message: "Bip... bip... bip... réponse reçue."
    });
    next();
})

app.use((request, response) => {
    console.log("Réponse envoyée.")
});

// Exportation de la constante pour une utilisation à partir d'autres fichiers
module.exports = app;