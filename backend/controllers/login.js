// *********************** //
// Importation des modules //
// *********************** //
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/user");

// ******************************* //
// Connexion au profil utilisateur //
// ******************************* //
exports.login = (request, response, next) => {
    // Vérification de l'existence d'un utilisateur dans la base de données    
    User.findOne({
        email: request.body.email
    })        
        // Possibilité d'interception des informations : prévoir une sécurité supplémentaire
        .then(user => {
            if (!user) {                
                return response.status(401).json({
                    // Sécurité : aucune information ne doit laisser transparaître
                    // la présence ou l'absence d'un utilisateur dans la base de données
                    message: "Identifiant ou mot de passe incorrect"
                });
            }
            // Comparaison entre les mots de passe de connexion et de la base de données
            bcrypt.compare(request.body.password, user.password)
                .then(valid => {                    
                    if (!valid) {
                        return response.status(401).json({
                            // Sécurité : aucune information ne doit laisser transparaître
                            // la présence ou l'absence d'un utilisateur dans la base de données
                            message: "Identifiant ou mot de passe incorrect"
                        });
                    }
                    response.status(200).json({
                        userId: user._id,
                        token: jsonwebtoken.sign(
                            {userId: user._id},
                            process.env.GENERATE_RANDOM_TOKEN,
                            {expiresIn: process.env.TOKEN_DURATION}
                        )
                    })                                    
                })               
                .catch(error => response.status(500).json({error: error}));
        })        
        .catch(error => response.status(500).json({error: error}));
};