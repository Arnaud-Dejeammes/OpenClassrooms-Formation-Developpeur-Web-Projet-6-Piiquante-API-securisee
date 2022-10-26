// *********************** //
// Importation des modules //
// *********************** //
const express = require("express");
const router = express.Router(); // Enregistrement des routes dans le routeur Express
// let router = express.Router();

// const User = require("../models/user");

const userController = require("../controllers/user");

// **************************** //
// Routage de la ressource User //
// **************************** //

// URL + /user (récupération globale)

// ******************** //
// Route pour le signup //
// ******************** //

// router.post("/api/auth/signup")
router.post("/signup", userController.signup); // Début de route indiquée dans l'application Express de server
// router.post("/signup", require("../controllers/user").signup);

// ******************* //
// Route pour le login //
// ******************* //

// router.post("/api/auth/login")
// router.post("/login", userController.login); // Début de route indiquée dans l'application Express de server

// *********** //
// Exportation //
// *********** //
module.exports = router;