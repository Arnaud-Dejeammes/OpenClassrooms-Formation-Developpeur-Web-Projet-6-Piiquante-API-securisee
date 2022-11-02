// *********************** //
// Importation des modules //
// *********************** //
const express = require("express");
const router = express.Router(); // Enregistrement des routes dans le routeur Express

const loginController = require("../controllers/login");
const signupController = require("../controllers/signup");

// ******************** //
// Route pour le signup //
// ******************** //
// router.post("/api/auth/signup")
router.post("/signup", signupController.signup);

// ******************* //
// Route pour le login //
// ******************* //
// router.post("/api/auth/login")
router.post("/login", loginController.login);

// ************************ //
// Exportation pour Express //
// ************************ //
module.exports = router;