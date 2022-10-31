// *********************** //
// Importation des modules //
// *********************** //
const mongoose = require("mongoose");

// Package utilitaire de validation (gestion d'adresses email uniques dans la base de données)
const uniqueValidator = require("mongoose-unique-validator");
// Vérifier la pertinence

// ************************** //
// Méthode Schema de Mongoose //
// ************************** //
const userSchema = mongoose.Schema({
    // _id généré par Mongoose
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.plugin(uniqueValidator);

// ************************ //
// Exportation pour Express //
// ************************ //
module.exports = mongoose.model("User", userSchema);