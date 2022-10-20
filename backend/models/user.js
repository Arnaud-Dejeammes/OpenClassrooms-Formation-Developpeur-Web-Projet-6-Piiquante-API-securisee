const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

// Méthode Schema de Mongoose
const userSchema = mongoose.Schema({
    // _id généré par Mongoose
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: String(64), // Hachage
        required: true,
        is: /^[0-9a-z]$/i
    }
}, {paranoid: true}); // Softdelete

userSchema.plugin(uniqueValidator);

// Exportation pour Express
module.exports = mongoose.model("User", userSchema);