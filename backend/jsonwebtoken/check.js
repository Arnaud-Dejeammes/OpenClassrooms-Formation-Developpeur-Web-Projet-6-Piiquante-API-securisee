// *********************** //
// Importation des modules //
// *********************** //
const jsonwebtoken = require("jsonwebtoken");

module.exports = (request, response, next) => {
    try {
        // Extraction du token à partir du header Authorization de la requête entrante
        // Le header contient le mot-clef Bearer
        // Header = Authorization: Bearer <token> 
        const token = request.headers.authorization.split(" ")[1]; // Récupération des données après l'espace
        const decodeToken = jsonwebtoken.verify(token, process.env.GENERATE_RANDOM_TOKEN);
        // Extraction de l'id utilisateur du token et ajout à l'objet request pour son exploitation par les différentes routes
        const userId = decodeToken.userId;
        
        request.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        response.status(401).json({error});
    };
};

// module.exports = router;