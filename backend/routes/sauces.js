const express = require("express");
const router = express.Router(); // Enregistrement des routes dans le routeur Express
// let router = express.Router();

const Sauce = require("../models/sauce");

const sauceController = require("../controllers/sauce");

// Routage de la ressource Sauce
// /api/sauces

// Route pour le tableau des sauces (Array of sauces)
router.get("/", (sauceController.getEverySauce));

// Route pour une sauce spécifique (Single sauce)
router.get("/:id", (sauceController.getOneSauce));

// Route pour l'ajout d'une sauce (message: String)
router.post("/", (sauceController.addSauce));

// Route pour la modification d'une sauce (message: String)
router.put("/:id", (sauceController.updateSauce));

// Route pour la suppression d'une sauce (message: String)
router.delete("/:id", (sauceController.deleteSauce));

// Route pour l'appréciation d'une sauce (like/dislike)
router.post("/:id/like", (sauceController.rateSauce));

module.exports = router;