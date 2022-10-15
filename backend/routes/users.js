const mongoose = require("mongoose");

const express = require("express");

const User = require("../models/user.js")

let router = express.Router();

// Routage de la ressource User
// URL + /user (récupération globale)
router.get("", (request, response) => {
    User.findAll()
    .then(users => response.json({data: users}))
    .catch(error => response.status(500).json({message: "Datatbase Error", error: error}))
});

router.get("/:id");

router.put("");

router.patch("/:id");

router.delete("/:id");

// Route pour le signup
// app.post("/api/auth/signup")

app.post("/api/auth/signup", (request, response) => {
    User.findAll()
    .then(users => response.json({data: users}))
    .catch(error => response.status(500).json({message: "Datatbase Error", error: error})) // Ne pas transmettre les erreurs pour la sécurité ?
});


app.post("/api/auth/login")

app.get("/api/sauces")

app.get("/api/sauces/:id")

// Attention au post après get
app.post("/api/sauces")

app.put("/api/sauces/:id")

app.delete("/api/sauces/:id")

app.post("/api/sauces/:id/like")