const mongoose = require("mongoose");

// Méthode Schema de Mongoose
const userSchema = mongoose.Schema({
    // _id généré par Mongoose
    email: {
        type: String,
        required: true,
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

// Exportation pour Express
module.exports = mongoose.model("User", userSchema);