const mongoose = require("mongoose");

// Package utilitaire de validation (gestion d'adresses email uniques dans la base de données)
const uniqueValidator = require("mongoose-unique-validator");

const bcrypt = require("bcrypt");

// let/const dataBaseConnexion = require("../db.config")

// Méthode Schema de Mongoose
const userSchema = mongoose.Schema({
    // _id généré par Mongoose
    email: {
        type: String,
        required: true,
        // allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Validation de données : blocage de chaînes ne correspondant pas à un email
        }
    },
    password: {
        type: String(64), // Hachage
        required: true,
        // allowNull: false,
        is: /^[0-9a-z]$/i // Contrainte // a-f ?
    }
}, {paranoid: true}); // Softdelete

userSchema.plugin(uniqueValidator);

// Exportation pour Express
module.exports = mongoose.model("User", userSchema);