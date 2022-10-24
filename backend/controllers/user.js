// *********************** //
// Importation des modules //
// *********************** //
const bcrypt = require("bcrypt")

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

// ******************************* //
// Connexion au profil utilisateur //
// ******************************* //
exports.login = (request, response, next) => {
    // Vérification de l'existence d'un utilisateur dans la base de données
    User.findOne({
        email: request.body.email
    })        
        .then(user => {
            // Utilisateur inexistant
            if (!user) {
                return response.status(401).json({  // Unauthorized
                    // Sécurité : aucune information ne doit laisser transparaître
                    // la présence ou l'absence d'un utilisateur dans la base de données
                    message: "Identifiant ou mot de passe incorrect"                    
                });
            }
            // Comparaison entre les mots de passe de connexion et de la base de données
            bcrypt.compare(request.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return response.status(401).json({ // Unauthorized
                            // Sécurité : aucune information ne doit laisser transparaître
                            // la présence ou l'absence d'un utilisateur dans la base de données
                            message: "Identifiant ou mot de passe incorrect"
                        });
                    }
                    response.status(200).json({
                        userId: user._id,
                        token: "TOKEN"
                    });
                })
                .catch(error => response.status(500).json({error}));
        })
        .catch(error => response.status(500).json({error}));
};