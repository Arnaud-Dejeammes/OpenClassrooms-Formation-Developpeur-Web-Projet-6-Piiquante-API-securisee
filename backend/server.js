// Serveur pour l'écoute et l'attente de requêtes http

// Importation du package http de Node.js avec la méthode require()
// Indication des chemins d'accès non nécessaires pour les modules comme avec import
const http = require("http");

// Importation de l'application
const app = require("./app");

// Fonction de determination du port : string ou number
const normalizePort = value => {
    const port = parseInt(value, 10);

    if (isNaN(port)) {
        return value;
    }

    if (port >= 0) {
        return port;
    }
    return false
};

// Variable environnement ou port par défaut
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port)

// Gestion des erreurs
const errorHandler = error => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const address = server.address(); // Vérifier la nécessité de la répétition
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
        default:
            throw error;
    };
};

// Serveur
const server = http.createServer(app); // Renvoi aux requests et responses contenues dans les middlewares

server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});

// Routage
// app.get("/", (request, response) => response.send("En ligne."));
// app.get("*", (request, response) => response.status(501).send("Route non implémantée"));

// Démarrage du serveur
// app.listen(3000, () => {
//     console.log("Serveur en marche sur le port 3000.")
// });

server.listen(port);