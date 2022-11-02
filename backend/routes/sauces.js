// *********************** //
// Importation des modules //
// *********************** //
const express = require("express");
const router = express.Router(); // Enregistrement des routes dans le routeur Express
// let router = express.Router();

// const Sauce = require("../models/sauce");

// *************************** //
// Importation des middlewares //
// *************************** //
const check = require("../middlewares/check"); // Déplacer le fichier et supprimer le dossier > "../middlewares/check"
const multer = require("../middlewares/multer");

// ******************************** //
// Importation des logiques métiers //
// ******************************** //
const sauceController = require("../controllers/sauce");

// ***************************** //
// Routage de la ressource Sauce //
// ***************************** //
// Règle de sécurité :
// 1. check (autorisation par token) > 2. multer

// /api/sauces

// ************************************************** //
// Route pour le tableau des sauces (Array of sauces) //
// ************************************************** //
router.get("/", check, sauceController.getEverySauce);

// ********************************************** //
// Route pour une sauce spécifique (Single sauce) //
// ********************************************** //
router.get("/:id", check, sauceController.getOneSauce);

// ************************************************ //
// Route pour l'ajout d'une sauce (message: String) //
// ************************************************ //
router.post("/", check, multer, sauceController.addSauce);

// ******************************************************** //
// Route pour la modification d'une sauce (message: String) //
// ******************************************************** //
router.put("/:id", check, multer, sauceController.updateSauce);

// ******************************************************* //
// Route pour la suppression d'une sauce (message: String) //
// ******************************************************* //
router.delete("/:id", check, sauceController.deleteSauce);

// **************************************************** //
// Route pour l'appréciation d'une sauce (like/dislike) //
// **************************************************** //
router.post("/:id/like", check, sauceController.rateSauce);

// *********** //
// Exportation //
// *********** //
module.exports = router;