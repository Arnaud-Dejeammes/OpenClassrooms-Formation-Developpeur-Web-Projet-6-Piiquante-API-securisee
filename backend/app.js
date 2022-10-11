// Création d'une application Express (importation du module)
const express = require("express");
// const cors = require("cors") // Voir si cors est nécessaire pour une API en local

// Appel de la méthode pour l'application
const app = express();

// Gestion de la requête POST (middleware du framework Express : prend les requêtes avec le Content-Type application/json, et met le body sur l'objet request)
// Analyse du corps de la requête
// Remplace body-parser
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect("",
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB on!"))
    .then(() => console.log("MongoDB failed!"));

// app.use(express.urlencoded({ extended: true}));

// Middlewares (fonction dans une application Express avec requête et réponse)

// Middleware généraliste de gestion des origines différentes
app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*"); // Applicable à toutes les routes
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.post("", (request, response, next) => {
    console.log(request.body); // Fonctionne grâce au middleware du framework Express
    response(201).json({
        message: "Création de l'objet."
    });
});

app.get("", (request, response, next) => {
    // Tableau de données
    // const nomDeLaConstante = [{}]
    // response.status(200).json(nomDeLaConstante);
})

// Exportation de la constante pour une utilisation à partir d'autres fichiers
module.exports = app;

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