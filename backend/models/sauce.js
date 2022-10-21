const mongoose = require("mongoose");

// let/const dataBaseConnexion = require("../db.config")

// Méthode Schema de Mongoose
const sauceSchema = mongoose.Schema({
    // _id généré par Mongoose, avec value et expectedType
    // String(11) // primarykey: true; autoIncrement: true
    userId: {
        type: String,
        required: true
        // allowNull: false
    },
    name: {
        type: String,
        required: true
        // allowNull: false
    },
    manufacturer: {
        type: String,
        required: true
        // allowNull: false
    },
    description: {
        type: String, // TEXT
        required: true
        // allowNull: false
    },
    mainPepper: {
        type: String,
        required: true
        // allowNull: false
    },
    imageURL: {
        type: String,
        required: true
    },
    heat: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    dislikes: {
        type: Number,
        required: true
    },
    usersLiked: {
        type: String,
        required: true
    }, // ["String <userId>"]
    userDisliked: {
        type: String,
        required: true
    } // ["String <userId>"]
});

// Exportation pour Express
module.exports = mongoose.model("Sauce", sauceSchema);

// Possibilité d'appeler directement le modèle
// module.exports = (mongoose) => {
//     return Sauce = mongoose.define("Sauce", {
//         userId: {
//             type: String,
//             required: true
//             // allowNull: false
//         } // etc.
//     });
// };