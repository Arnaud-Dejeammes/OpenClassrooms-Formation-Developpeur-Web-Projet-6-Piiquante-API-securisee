const mongoose = require("mongoose");

// Méthode Schema de Mongoose
const sauceSchema = mongoose.Schema({
    // _id généré par Mongoose
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageURL: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    usersLiked: {type: String, required: true}, // ["String <userId>"]
    userDisliked: {type: String, required: true} // ["String <userId>"]
});

// Exportation pour Express
module.exports = mongoose.model("Sauce", sauceSchema);