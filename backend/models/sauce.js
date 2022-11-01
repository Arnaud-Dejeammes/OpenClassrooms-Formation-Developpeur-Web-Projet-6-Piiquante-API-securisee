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
    
    // Front end        
        // newSauce.name = this.sauceForm.get('name')!.value;
        // newSauce.manufacturer = this.sauceForm.get('manufacturer')!.value;
        // newSauce.description = this.sauceForm.get('description')!.value;
        // newSauce.mainPepper = this.sauceForm.get('mainPepper')!.value;
        // newSauce.heat = this.sauceForm.get('heat')!.value;
        // newSauce.userId = this.auth.getUserId();
        
    name: {
        type: String,
        required: true
        // trim: true
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
        // required: true
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
        // required: false,
        default: 0
    },
    dislikes: {
        type: Number,
        // required: false,
        default: 0
    },
    usersLiked: {
        type: [String], // ["String <userId>"]
        // required: false        
    },
    usersDisliked: {
        type: [String], // ["String <userId>"]
        // required: false
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