// *********************** //
// Importation des modules //
// *********************** //
const Sauce = require("../models/sauce");

// const { findOneAndUpdate } = require("../models/sauce");

// ********************************* //
// Tableau complet (Array of sauces) //
// ********************************* //

// router.get("/", (sauceController.getEverySauce));
exports.getEverySauce = (request, response, next) => {
    Sauce.find()
        .then(everySauce => response.json({data: everySauce})) // 200: resource collection (read)
        .catch(error => response.status(500).json({error: error}));
};

// ********************************* //
// Element spécifique (Single sauce) //
// ********************************* //

// router.get("/:id", (sauceController.getOneSauce));
exports.getOneSauce = (request, response, next) => {
    Sauce.findOne({
        _id: request.params.id
    })
        .then(oneSauce => response.json({data: oneSauce})) // 200: resource object (read)
        .catch(error => response.status(500).json({error: error})); // 400
};

// *********************** //
// Ajout (message: String) //
// *********************** //

// !!! Avec MongoDB, le nom de la collection prend par défaut le nom du modèle au pluriel (Sauce > Sauces)

// router.post("/", (sauceController.addSauce));
exports.addSauce = (request, response, next) => {
    // delete request.body._id; // Suppression de l'_id envoyé par le front-end
    // console.log(request.body) La clef _id n'apparaît pas.
    const sauce = new Sauce({...request.body});  // spread : copie des éléments de request.body
    sauce.save()
        .then(() => {
            response.status(201).json({message: "Sauce ajoutée"}); // 201: resource object (create)
        })
        .catch(error => response.status(400).json({error: error}));
};

// Version async/await pour éviter une succession trop importante de .then()
// exports.addSauce = async (request, response, next) => {
//     // delete request.body._id;
//     try{
//         let sauce = await Sauce.create(request.body);
//         return response.status(201).json({data: sauce, message: "Sauce ajoutée"});
//     }catch(e){
//         return response.status(500).json({error: e})
//     }  
// };

// ****************************** //
// Modification (message: String) //
// ****************************** //

// router.put("/:id", (sauceController.updateSauce));
exports.updateSauce = (request, response, next) => {
    Sauce.updateOne({ // findOneAndUpdate
        _id: request.params.id,
        ...request.body // spread : copie des éléments de request.body
    })
    .then(() => {
        response.status(200).json({message: "Sauce modifiée"}); // 200/204/201: resource object (update)
    })
    .catch(error => response.status(500).json({error: error})); // .catch((error) => {response.status(400).json({error: error});});
}; // Pour des questions de sécurité, séparer le front du back : se contenter de messages.

// ***************************** //
// Suppression (message: String) //
// ***************************** //

// router.delete("/:id", (sauceController.deleteSauce));
exports.deleteSauce = (request, response, next) => {
    Sauce.deleteOne({
        _id: request.params.id
    })
    .then(() => {
        response.status(200).json({message: "Sauce supprimée"}); // 200/202/204: no response (delete resource)
    })
    .catch(error => response.status(400).json({error: error})); // .catch((error) => {response.status(400).json({error: error});});
};

// ****************************** //
// Appréciation (message: String) //
// ****************************** //

// router.post("/:id/like", (sauceController.rateSauce));
exports.rateSauce = (request, response, next) => {
    // Sauce.findOne
    // Sauce.updateOne
    // Sauce.updateOne
};