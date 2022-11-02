// *********************** //
// Importation des modules //
// *********************** //
const mongoose = require("mongoose");

// ************************** //
// Méthode Schema de Mongoose //
// ************************** //
const sauceSchema = mongoose.Schema({
    // _id généré par Mongoose, avec value et expectedType
    // primarykey: true; autoIncrement: true
        
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
    heat: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }, 
    likes: {
        type: Number,        
        default: 0
    },
    dislikes: {
        type: Number,        
        default: 0
    },
    usersLiked: {
        type: [String],
    },
    usersDisliked: {
        type: [String],
    }
});

// ************************ //
// Exportation pour Express //
// ************************ //
module.exports = mongoose.model("Sauce", sauceSchema);