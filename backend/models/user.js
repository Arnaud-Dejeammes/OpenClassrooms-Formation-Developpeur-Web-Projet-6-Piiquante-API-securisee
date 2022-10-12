const mongoose = require("mongoose");

// Méthode Schema de Mongoose
const userSchema = mongoose.Schema({
    // _id généré par Mongoose
    email: {type: String, required: true},
    password: {type: String, required: true} // Hachage
    
});

// Exportation pour Express
module.exports = mongoose.model("User", userSchema);