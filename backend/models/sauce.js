// *********************** //
// Importation des modules //
// *********************** //
const mongoose = require("mongoose");

// ************************** //
// Méthode Schema de Mongoose //
// ************************** //
const sauceSchema = mongoose.Schema({
    // _id généré par Mongoose, avec value et expectedType
    // String(11) // primarykey: true; autoIncrement: true
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    mainPepper: {
        type: String,
        required: true
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
        type: ["String <userId>"],
        required: true
    },
    userDisliked: {
        type: ["String <userId>"],
        required: true
    }  
});

// ************************ //
// Exportation pour Express //
// ************************ //
module.exports = mongoose.model("Sauce", sauceSchema);

// Possibilité d'appeler directement le modèle
// module.exports = (mongoose) => {
//     return Sauce = mongoose.define("Sauce", {
//         userId: {
//             type: String,
//             required: true//             
//         } // etc.
//     });
// };