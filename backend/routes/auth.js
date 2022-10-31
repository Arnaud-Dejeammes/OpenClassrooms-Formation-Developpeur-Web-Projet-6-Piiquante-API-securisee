// *********************** //
// Importation des modules //
// *********************** //
const express = require("express");
const bcrypt = require("bcrypt");
// const jsonwebtoken = require("jsonwebtoken");

// const User = require("../model/user");

const router = express.Router(); // Enregistrement des routes dans le routeur Express

// const userController = require("../controllers/user")

// const User = require("../models/user");

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