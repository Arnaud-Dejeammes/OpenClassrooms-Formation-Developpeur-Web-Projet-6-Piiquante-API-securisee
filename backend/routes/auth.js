const express = require("express");
const router = express.Router(); // Enregistrement des routes dans le routeur Express
// let router = express.Router();

// const User = require("../models/user");

const authentificationController = require("../controllers/auth");

// Route pour le signup
// router.post("/api/auth/signup")
router.post("/signup", (userController.signup));

// Route pour le login
// router.post("/api/auth/login")
router.post("/login", (userController.login));

module.exports = router;