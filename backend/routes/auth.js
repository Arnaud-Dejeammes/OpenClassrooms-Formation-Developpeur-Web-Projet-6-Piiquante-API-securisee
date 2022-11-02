// *********************** //
// Importation des modules //
// *********************** //
const express = require("express");
const router = express.Router(); // Enregistrement des routes dans le routeur Express

const authentificationController = require("../controllers/auth");
const userController = require("../controllers/user");

// ******************** //
// Route pour le signup //
// ******************** //
// router.post("/api/auth/signup")
router.post("/signup", userController.signup);

// ******************* //
// Route pour le login //
// ******************* //
// router.post("/api/auth/login")
router.post("/login", authentificationController.login);

// ************************ //
// Exportation pour Express //
// ************************ //
module.exports = router;