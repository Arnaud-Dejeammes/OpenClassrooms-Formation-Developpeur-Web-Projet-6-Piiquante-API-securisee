// *********************** //
// Importation des modules //
// *********************** //
const express = require("express");
const fileSystem = require("fs");

const Sauce = require("../models/sauce");
// const { findOneAndUpdate } = require("../models/sauce");

// ********************************* //
// Tableau complet (Array of sauces) //
// ********************************* //
// router.get("/", (sauceController.getEverySauce));
exports.getEverySauce = (request, response, next) => {
    Sauce.find()        
        .then((sauces) => {response.status(200).json(sauces)}) // Code
        // .then(everySauce => response.json({data: everySauce})) // 200: resource collection (read)
        .catch(error => response.status(404).json({error: error}));
};

// ********************************* //
// Element spécifique (Single sauce) //
// ********************************* //
// router.get("/:id", (sauceController.getOneSauce));
exports.getOneSauce = (request, response, next) => {
    Sauce.findOne({
        _id: request.params.id
    })
        .then(console.log(request.params))
        .then((oneSauce) => {response.status(200).json(oneSauce)}) // Code
        // .then(oneSauce => response.json({data: oneSauce})) // 200: resource object (read)
        .catch(error => response.status(500).json({error: error})); // 400
};

// *********************** //
// Ajout (message: String) //
// *********************** //
// router.post("/", (sauceController.addSauce));
// !!! Avec MongoDB, le nom de la collection prend par défaut le nom du modèle au pluriel (Sauce > Sauces)

// Front end
    // const newSauce = new Sauce();
    // newSauce.name = this.sauceForm.get('name')!.value;
    // newSauce.manufacturer = this.sauceForm.get('manufacturer')!.value;
    // newSauce.description = this.sauceForm.get('description')!.value;
    // newSauce.mainPepper = this.sauceForm.get('mainPepper')!.value;
    // newSauce.heat = this.sauceForm.get('heat')!.value;
    // newSauce.userId = this.auth.getUserId();

// delete sauceObject.userId; // Suppression pour le remplacement par le jeton sécurisé
// console.table(request.body.sauce);  // Possibilité d'interception des informations

exports.addSauce = (request, response, next) => {
    // console.log(request.body)
    const sauceObject = express.json(request.body.sauce); // Données de la requête envoyées par le front-end : form-data
    // const sauceObject = JSON.parse(request.body.sauce); // Données de la requête envoyées par le front-end : form-data
    // Unexpected token u in JSON at position 0
    // delete sauceObject._id;
    // delete sauceObject.userId;
    // delete request.body._id; // Suppression de l'_id envoyé par le front-end
    // console.log(sauceObject);
    const sauce = new Sauce({        
        ...sauceObject,
        // userId: request.auth.userId
        // imageUrl: `${request.protocol}://${request.get("host")}/images/${request.file.filename}`        
        
    });  
    console.log(sauce) 
    // console.log(request.body.sauce) 
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
    Sauce.findOne({ // deleteOne
        _id: request.params.id
    })
    .then((oneSauce) => {
        if (oneSauce._id != request.auth._id) { // userId
            response.status(401).json({error: error})
        } else {
            const filename = oneSauce.imageUrl.split("/images/")[1];
            fileSystem.unlink(`images/$(filename)`, () => {
                Sauce.deleteOne({
                    _id: request.params.id
                })
                .then(() => {response.status(200).json({
                    message: "Sauce supprimée"
                })})
                .catch(error => response.status(401).json({error: error}));
            });
        }
    })
    // .then(() => {
    //     response.status(200).json({message: "Sauce supprimée"}); // 200/202/204: no response (delete resource)
    // })
    .catch(error => response.status(5800).json({error: error})); // .catch((error) => {response.status(400).json({error: error});});
};

// ****************************** //
// Appréciation (message: String) //
// ****************************** //

exports.rateSauce = (request, response, next) => {
    
    const idNumber = request.params.id;
    const userNumber = request.body.userId;
    
    const like = request.body.like;
    // const ??? = Sauce.updateOne()

    console.log(idNumber);

    if (like === 0) {

    };

    if (like === 1) {
        Sauce.updateOne(
            {_id: idNumber},
            {
                $push: {
                    usersLiked: userId,
                },
                $inc: {
                    likes: +1
                }
            }
        )        
        .then(() => response.status(200).json({message: "Aimée"}))
        .catch(error => response.status(500).json({error: error})); // 400
    };

    if (like === -1) {
        Sauce.updateOne(
            {_id: idNumber},
            {
                $push: {
                    usersDisiked: userId,
                },
                $inc: {
                    dislikes: +1
                }
            }
        )        
        .then(() => response.status(200).json({message: "Pas aimée"}))
        .catch(error => response.status(500).json({error: error})); // 400
    };

    Sauce.findOne({
        _id: request.params.id
    })
    
};

// router.post("/:id/like", (sauceController.rateSauce));
exports.rateSauce = (request, response, next) => {
    // Sauce.findOne
    // Sauce.updateOne
    // Sauce.updateOne
};