// *********************** //
// Importation des modules //
// *********************** //
const fileSystem = require("fs");

const Sauce = require("../models/sauce");

// *************** //
// Tableau complet //
// *************** //
exports.getEverySauce = (request, response, next) => {
    Sauce.find()        
        .then((sauces) => {response.status(200).json(sauces)})
        .catch(error => response.status(500).json({error: error}));
};

// ****************** //
// Element spécifique //
// ****************** //
exports.getOneSauce = (request, response, next) => {
    Sauce.findOne({
        _id: request.params.id
    })        
        .then((oneSauce) => {response.status(200).json(oneSauce)})
        .catch(error => response.status(500).json({error: error}));
};

// ***** //
// Ajout //
// ***** //
exports.addSauce = (request, response, next) => {
     // Interprétation des données de la requête envoyées par le front-end (form-data)
    const sauceObject = JSON.parse(request.body.sauce);
    
    // Suppression de l'_id envoyé par le front end pour le remplacement par le jeton sécurisé
    delete sauceObject._id;
    
    const sauce = new Sauce({        
        ...sauceObject,
        imageUrl: `${request.protocol}://${request.get("host")}/images/${request.file.filename}`
    });
    
    sauce.save()
        .then(() => {
            response.status(201).json({message: "Sauce ajoutée"});
        })
        .catch(error => response.status(500).json({error: error}));
};

// ************ //
// Modification //
// ************ //
exports.updateSauce = (request, response, next) => {    
    // Modification avec changement d'image
    if (request.file) {
        Sauce.findOne(
            {_id: request.params.id},
        )
        .then(sauce => {
            // Suppression de l'ancienne image
            const filename = sauce.imageUrl.split("/images/")[1];
            fileSystem.unlink(`images/$(filename)`, () => {
                const sauceObject = {
                    ...JSON.parse(request.body.sauce),
                    imageUrl: `${request.protocol}://${request.get("host")}/images/${request.file.filename}`
                }
                // Enregistrement de la modification
                Sauce.updateOne(
                    {_id: request.params.id},
                    {...sauceObject}
                )
                .then(() => {
                    response.status(200).json({message: "Sauce modifiée"});
                })
                .catch(error => response.status(500).json({error: error}));
            })
        })
        .catch(error => response.status(500).json({error: error}));
    } else { // Modification sans changement d'image
        Sauce.findOneAndUpdate(
            {_id: request.params.id},
            {
                ...request.body                
            })
        .then(() => {
            response.status(200).json({message: "Sauce modifiée"});
        })
        .catch(error => response.status(500).json({error: error}));
    }
};

// *********** //
// Suppression //
// *********** //
exports.deleteSauce = (request, response, next) => {
    Sauce.findOne({
        _id: request.params.id
    })
        .then((sauce) => {
            const filename = sauce.imageUrl.split("/images/")[1];
            
            fileSystem.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({
                    _id: request.params.id
                })
                .then(() => {response.status(200).json({
                    message: "Sauce supprimée"
                })})
                .catch(error => response.status(401).json({error: error}));
            });
        })    
        .catch(error => response.status(500).json({error: error}));
};

// ************ //
// Appréciation //
// ************ //
exports.rateSauce = (request, response, next) => {
    const sauceId = request.params.id;
    const userId = request.body.userId;
    
    const like = request.body.like;
    // MongoDB operators
    // $inc: increments a field by a specified value
    // $pull: removes from an existing array all instances of a value that match a specified condition
   
    Sauce.findOne({
        _id : sauceId
    })
        .then((sauce) => {  
            // // Ajout d'une appréciation positive (like)
            if (!sauce.usersLiked.includes(userId) && like === 1) {
                Sauce.updateOne(
                    {_id : sauceId},
                    {
                        $inc: {likes: +1},
                        $push: {usersLiked: userId}
                    }
                )
                    .then(() => response.status(201).json({message: "Aimée"}))
                    .catch((error) => response.status(400).json({error: error}));
            };

            // Retrait de l'appréciation positive (like)
            if (sauce.usersLiked.includes(userId) && like === 0) {
                Sauce.updateOne(
                    {_id : sauceId},
                    {
                        $inc: {likes: -1},
                        $pull: {usersLiked: userId}
                    }
                )
                    .then(() => response.status(201).json({message: "Appréciation positive retirée"}))
                    .catch((error) => res.status(400).json({error: error}));
            };
  
            // // Ajout d'une appréciation négative (dislike)
            if (!sauce.usersDisliked.includes(userId) && like === -1) {
                Sauce.updateOne(
                    {_id : sauceId},
                    {
                        $inc: {dislikes: +1},
                        $push: {usersDisliked: userId}
                    }
                )
                    .then(() => response.status(201).json({message: "Pas aimée"}))
                    .catch((error) => response.status(400).json({error: error}));
            };
  
            // Retrait de l'appréciation négative (dislike)
            if (sauce.usersDisliked.includes(userId) && like === 0) {
                Sauce.updateOne(
                    {_id : sauceId},
                    {
                        $inc: {dislikes: -1},
                        $pull: {usersDisliked: userId}
                    }
                )
                    .then(() => response.status(201).json({message: "Appréciation négative retirée"}))
                    .catch((error) => response.status(500).json({error: error}));
            };
        })      
        .catch((error) => response.status(500).json({error: error}));
  };
  