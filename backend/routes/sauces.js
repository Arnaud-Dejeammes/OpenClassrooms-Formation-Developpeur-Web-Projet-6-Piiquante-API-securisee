// const mongoose = require("mongoose");

const express = require("express");
const router = express.Router(); // Enregistrement des routes dans le routeur Express
// let router = express.Router();

const Sauce = require("../models/sauce.js");

const sauceController = require("../controllers/sauce.js");

router.get("", (request, response) => {
    Sauce.findAll()
    .then(sauces => response.json({data: sauces}))
    .catch(error => response.status(500).json({message: "Datatbase Error", error: error}))
});

// Routage de la ressource Sauce
// /api/sauces

// Route pour le tableau des sauces
router.get("/", (sauceController.getEverySauce));

// Route une sauce spécifique
router.get("/:id", (sauceController.getOneSauce));

// Route pour l'ajout d'une sauce
router.post("/", (sauceController.addSauce));

// Route pour la modification d'une sauce
router.put("/:id", (sauceController.modifySauce));

// Route pour la suppression d'une sauce
router.delete("/:id", (sauceController.deleteSauce));

// router.delete("/:id", (request, response, next) => {
//     Sauce.deleteOne({
//         _id: request.params.id
//     })
//     .then(() => {
//         response.status(200).json({message: "Sauce supprimée"});
//     })
//     .catch(error => response.status(400).json({error: error}));
// });

// Route pour l'appréciation d'une sauce (like/dislike)
router.post("/:id/like", (sauceController.rateSauce));

module.exports = router;

// app.post("", (request, response, next) => {
//     console.log(request.body); // Fonctionne grâce au middleware du framework Express
//     response(201).json({
//         message: "Création de l'objet."
//     });
// });

// app.get("", (request, response, next) => {
//     // Tableau de données
//     // const nomDeLaConstante = [{}]
//     // response.status(200).json(nomDeLaConstante);
// })