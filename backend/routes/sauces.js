const express = require("express");
const router = express.Router(); // Enregistrement des routes dans le routeur Express
// let router = express.Router();

const Sauce = require("../models/sauce.js");

const sauceController = require("../controllers/sauce.js");

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

// Route pour l'appréciation d'une sauce (like/dislike)
router.post("/:id/like", (sauceController.rateSauce));

module.exports = router;