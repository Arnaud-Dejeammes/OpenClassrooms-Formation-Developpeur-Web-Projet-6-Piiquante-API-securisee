const Sauce = require("../models/sauce.js");

// Modification
// router.put("/:id", (sauceController.modifySauce));
exports.updateSauce = (request, response, next) => {
    Sauce.updateOne(
        {id: request.params.id},
        {...request.body,
        _id: request.params.id}
    )
    .then(() => {
        response.status(200).json({message: "Sauce modifiée"});
    })
    .catch(error => response.status(400).json({error: error})); // .catch((error) => {response.status(400).json({error: error});});
};

// Suppression
// router.delete("/:id", (sauceController.deleteSauce));
exports.deleteSauce = (request, response, next) => {
    Sauce.deleteOne({
        _id: request.params.id
    })
    .then(() => {
        response.status(200).json({message: "Sauce supprimée"});
    })
    .catch(error => response.status(400).json({error: error})); // .catch((error) => {response.status(400).json({error: error});});
}

// app.post("", (request, response, next) => {
//     console.log(request.body); // Fonctionne grâce au middleware du framework Express
//     response(201).json({
//         message: "Création de l'objet."
//     });
// });

// app.get("", (request, response, next) => {
//     // Tableau de données
//     // const nomDeLaConstante = [{}]
//     // response.status(200).json(nomDeLaConstante);
// })