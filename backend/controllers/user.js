// *********************** //
// Importation des modules //
// *********************** //
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/user");

// *************************************************** //
// Création d'un profil utilisateur (email + password) //
// *************************************************** //
exports.signup = (request, response, next) => {
    bcrypt.hash(request.body.password, parseInt(process.env.BCRYPT_SALT_ROUND)) // bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        .then(hash => {
            const user = new User({
                email: request.body.email,
                password: hash
            });
            user.save()
                .then(() => response.status(201).json({message: "Utilisateur enregistré"}))
                .catch(error => response.status(400).json({error}));
        })
        .catch(error => response.status(500).json({error}));
};