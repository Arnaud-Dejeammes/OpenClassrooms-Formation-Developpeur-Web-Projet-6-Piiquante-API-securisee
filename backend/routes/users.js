// const mongoose = require("mongoose");

const express = require("express");
const router = express.Router(); // Enregistrement des routes dans le routeur Express
// let router = express.Router();

const User = require("../models/user.js");

const userController = require("../controllers/user.js");

// Routage de la ressource User
// URL + /user (récupération globale)

// Route pour le signup
// router.post("/api/auth/signup")
router.post("/auth/signup", (userController.signUpUser));

// Route pour le login
// router.post("/api/auth/login")
router.post("/auth/login", (userController.logInUser));

module.exports = router;