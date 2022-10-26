// *********************** //
// Importation des modules //
// *********************** //
const bcrypt = require("bcrypt")
// const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/user");

// *************************************************** //
// Création d'un profil utilisateur (email + password) //
// *************************************************** //
exports.signup = (request, response, next) => {
    bcrypt.hash(request.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        .then(hash => {
            console.table(request.body);  // Possibilité d'interception des informations
            const user = new User({
                email: request.body.email,
                password: hash
            });
            console.table(user); // Protéger l'adresse email ?
            user.save()
                .then(() => response.status(201).json({message: "Utilisateur enregistré"}))
                .catch(error => response.status(400).json({error}));
        })
        .catch(error => response.status(500).json({error}));        
};