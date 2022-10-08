// Serveur pour l'écoute et l'attente de requêtes http

// Importation du package http de Node.js avec la méthode require()
// Indication des chemins d'accès non nécessaires pour les modules comme avec import
const http = require("http");

// Serveur
const server = http.createServer((request, response) => {
    response.end("Réponse test"); // Réponse type string
});

// Variable environnement ou port par défaut
server.listen(process.env.PORT || 3000);