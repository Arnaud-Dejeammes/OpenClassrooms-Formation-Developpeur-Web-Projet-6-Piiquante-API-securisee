// const { findOneAndUpdate } = require("../models/sauce");
const Sauce = require("../models/sauce");

// let/const dataBaseConnexion = require("../db.config");

// Tableau complet (Array of sauces)
// router.get("/", (sauceController.getEverySauce));
exports.getEverySauce = (request, response, next) => {
    Sauce.find()
        .then(everySauce => response.json({data: everySauce})) // 200: resource collection (read)
        .catch(error => response.status(500).json({error: error}));
};

// Element spécifique (Single sauce)
// router.get("/:id", (sauceController.getOneSauce));
exports.getOneSauce = (request, response, next) => {
    Sauce.findOne({
        _id: request.params.id
    })
        .then(oneSauce => response.json({data: oneSauce})) // 200: resource object (read)
        .catch(error => response.status(500).json({error: error})); // 400
};

// Ajout (message: String)
// router.post("/", (sauceController.addSauce));
// !!! Avec MongoDB, le nom de la collection prend par défaut le nom du modèle au pluriel (Sauce > Sauces)

exports.addSauce = (request, response, next) => {
    delete request.body._id; // Suppression du _id envoyé par le front-end
    const sauce = new Sauce({...request.body});  // spread : copie des éléments de request.body
    sauce.save()
        .then(() => {
            response.status(201).json({message: "Sauce ajoutée"}); // 201: resource object (create)
        })
        .catch(error => response.status(400).json({error: error}));
};

// exports.addSauce = (request, response, next) => { // async
//     delete request.body._id; // Suppression du _id envoyé par le front-end
//     // Sauce.create(request.body)
//     Sauce.save() // Renvoi d'une promise par la méthode save()
//     .then(() => {
//         response.status(201).json({message: "Sauce ajoutée"});
//     })
//     .catch(error => response.status(400).json({error: error}));
// }

// async/await
// exports.addSauce = async (request, response, next) => {
//     // delete request.body._id;
//     let sauce = await Sauce.create(request.body);
//     return response.status(201).json({data: sauce, message: "Sauce ajoutée"});
//     // .catch(error => response.status(400).json({error: error}));
// };

// exports.addSauce = async (request, response, next) => {
//     // delete request.body._id;    
//     await Sauce.create()
//     .then(() => response.status(201).json({data: request.body, message: "Sauce ajoutée"}))
//     .catch(error => response.status(400).json({error: error}));
// };

// Modification (message: String)
// router.put("/:id", (sauceController.updateSauce));
exports.updateSauce = (request, response, next) => {
    Sauce.updateOne({ // findOneAndUpdate
        _id: request.params.id,
        ...request.body // spread : copie des éléments de request.body
    })
    .then(() => {
        response.status(200).json({message: "Sauce modifiée"}); // 200/204/201: resource object (update)
    })
    .catch(error => response.status(400).json({error: error})); // .catch((error) => {response.status(400).json({error: error});});
};

// Suppression (message: String)
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

// Appréciation (message: String)
// router.post("/:id/like", (sauceController.rateSauce));
exports.rateSauce = (request, response, next) => {
    // Sauce.findOne
    // Sauce.updateOne
    // Sauce.updateOne
};

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