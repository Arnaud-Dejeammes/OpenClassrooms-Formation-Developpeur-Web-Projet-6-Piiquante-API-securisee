const Sauce = require("../models/sauce.js");

exports.deleteSauce = (request, response, next) => {
    Sauce.deleteOne({
        _id: request.params.id
    })
    .then(() => {
        response.status(200).json({message: "Sauce supprimée"});
    })
    .catch(error => response.status(400).json({error: error})); // .catch((error) => {response.status(400).json({error: error});});
}
  