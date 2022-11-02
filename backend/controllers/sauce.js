// *********************** //
// Importation des modules //
// *********************** //
const fileSystem = require("fs");

const Sauce = require("../models/sauce");

// Pour des questions de sécurité, séparer le front du back : se contenter de messages.

// *************** //
// Tableau complet //
// *************** //
// router.get("/", sauceController.getEverySauce);
exports.getEverySauce = (request, response, next) => {
    Sauce.find()        
        .then((sauces) => {response.status(200).json(sauces)}) // 200: resource collection (read)        
        .catch(error => response.status(404).json({error: error})); // 404 : not found
};

// ****************** //
// Element spécifique //
// ****************** //
// router.get("/:id", (sauceController.getOneSauce));
exports.getOneSauce = (request, response, next) => {
    Sauce.findOne({
        _id: request.params.id
    })        
        .then((oneSauce) => {response.status(200).json(oneSauce)}) // 200: resource object (read)        
        .catch(error => response.status(500).json({error: error})); // 400
};

// ***** //
// Ajout //
// ***** //
// router.post("/", sauceController.addSauce);
// !!! Avec MongoDB, le nom de la collection prend par défaut le nom du modèle au pluriel (sauce > sauces)
exports.addSauce = (request, response, next) => {    
    const sauceObject = JSON.parse(request.body.sauce); // Données de la requête envoyées par le front-end : form-data
    
    delete sauceObject._id; // Suppression de l'_id envoyé par le front end pour le remplacement par le jeton sécurisé
    
    const sauce = new Sauce({        
        ...sauceObject, // spread : copie des éléments de request.body
        imageUrl: `${request.protocol}://${request.get("host")}/images/${request.file.filename}`
    });
    
    sauce.save()
        .then(() => {
            response.status(201).json({message: "Sauce ajoutée"}); // 201: resource object (create)
        })
        .catch(error => response.status(400).json({error: error})); // 400: bad request
};

// ************ //
// Modification //
// ************ //
// router.put("/:id", sauceController.updateSauce);
exports.updateSauce = (request, response, next) => {    
    // Modification avec changement d'image
    if (request.file) {
        Sauce.findOne( // findOneAndUpdate
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
                    response.status(200).json({message: "Sauce modifiée"}); // 200/201: resource object (update)
                })
                .catch(error => response.status(400).json({error: error})); // 500
            })
        })
        .catch(error => response.status(500).json({error: error})); // 400
    } else { // Modification sans changement d'image
        Sauce.findOneAndUpdate( // updateOne
            {_id: request.params.id},
            {
                ...request.body,
                // imageUrl: `${request.protocol}://${request.get("host")}/images/${request.file.filename}`
            })
        .then(() => {
            response.status(200).json({message: "Sauce modifiée"}); // 200/201: resource object (update)
        })
        .catch(error => response.status(500).json({error: error})); // 400
    }
};

// ***************************** //
// Suppression (message: String) //
// ***************************** //
// router.delete("/:id", sauceController.deleteSauce);
exports.deleteSauce = (request, response, next) => {
    Sauce.findOne({ // deleteOne
        _id: request.params.id
    })
    .then((oneSauce) => {
        // if (oneSauce._id != request.auth._id) { // userId
        //     response.status(401).json({error: error})
        // } else {
        //     const filename = oneSauce.imageUrl.split("/images/")[1];
        //     fileSystem.unlink(`images/$(filename)`, () => {
                Sauce.deleteOne({
                    _id: request.params.id
                })
                .then(() => {response.status(200).json({
                    message: "Sauce supprimée"
                })})
                .catch(error => response.status(401).json({error: error}));
            // });
        // }
    })
    // .then(() => {
    //     response.status(200).json({message: "Sauce supprimée"}); // 200/202/204: no response (delete resource)
    // })
    .catch(error => response.status(500).json({error: error})); // .catch((error) => {response.status(400).json({error: error});});
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