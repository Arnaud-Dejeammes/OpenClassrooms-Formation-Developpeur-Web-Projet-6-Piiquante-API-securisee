// Serveur pour l'écoute et l'attente de requêtes http
//!!!Nouvelles version en vue de supprimer app.js!!!/

// Création d'une application Express (importation du module)
const express = require("express");
const cors = require("cors");

// Appel de la méthode pour l'application
const app = express();

// Middlewares (fonction dans une application Express avec requête et réponse)

// Middleware généraliste pour le partage des ressources entre origines multiples
app.use(cors({
    origin: "*", // response.setHeader("Access-Control-Allow-Origin", "*"); // Applicable à toutes les routes
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    allowHeaders: "Origin, X-Requested-With, X-Access-Token, Role, Content, Accept, Content-Type, Authorization" // response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");    
}));

// Gestion de la requête POST (middleware du framework Express : prend les requêtes avec le Content-Type application/json, et met le body sur l'objet request)
// Analyse du corps de la requête
// Remplace body-parser
app.use(express.json());

// app.use(express.urlencoded({extended: true}));

// Importation des modules de routage
const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/auth");

// Routage
app.use("/sauces", sauceRoutes);
app.use("/auth", userRoutes); // Token

// Démarrage du serveur
const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.nnpm2mg.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB on!"))
    .catch(() => console.log("MongoDB failed!"));

// Exportation de la constante pour une utilisation à partir d'autres fichiers
module.exports = server; // module.exports = app;
// Vérifier l'utilité

///////////////////////////////////////////////////////////////////

//!!!Ancienne version en corrélation avec app.js!!!/
// Importation du package http de Node.js avec la méthode require()
// Indication des chemins d'accès non nécessaires pour les modules comme avec import
// const http = require("http");

// // Importation de l'application
// const app = require("./app");

// // Fonction de determination du port : string ou number
// const normalizePort = value => {
//     const port = parseInt(value, 10);

//     if (isNaN(port)) {
//         return value;
//     }

//     if (port >= 0) {
//         return port;
//     }
//     return false
// };

// // Variable environnement ou port par défaut
// const port = normalizePort(process.env.PORT || "3000");
// app.set("port", port)

// // Gestion des erreurs
// const errorHandler = error => {
//     if (error.syscall !== "listen") {
//         throw error;
//     }

//     const address = server.address(); // Vérifier la nécessité de la répétition
//     const bind = typeof address === "string" ? "pipe " + address : "port " + port;
//     switch (error.code) {
//         case "EACCES":
//             console.error(bind + " requires elevated privileges.");
//             process.exit(1);
//             break;
//         case "EADDRINUSE":
//             console.error(bind + " is already in use.");
//             process.exit(1);
//         default:
//             throw error;
//     };
// };

// // Serveur
// const server = http.createServer(app); // Renvoi aux requests et responses contenues dans les middlewares

// server.on("error", errorHandler);
// server.on("listening", () => {
//     const address = server.address();
//     const bind = typeof address === "string" ? "pipe " + address : "port " + port;
//     console.log("Listening on " + bind);
// });

// server.listen(port, () => {
//     console.log(`Server running on port ${process.env.PORT}.`)
// });