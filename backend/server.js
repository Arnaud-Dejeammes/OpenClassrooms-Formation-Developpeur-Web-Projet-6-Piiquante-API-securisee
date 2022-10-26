// Serveur pour l'écoute et l'attente de requêtes http
// *********************** //
// Importation des modules //
// *********************** //

// Création d'une application Express (importation du module)
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// require("./jsonwebtoken/check")

// ********************************** //
// Importation des modules de routage //
// ********************************** //
const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth")

// Appel de la méthode pour l'application
const app = express();

// ****************************************************************************** //
// Middleware généraliste pour le partage des ressources entre origines multiples //
// ****************************************************************************** //
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

// ******* //
// Routage //
// ******* //
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/auth", authRoutes);

// ******************** //
// Démarrage du serveur //
// ******************** //
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.nnpm2mg.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {        
        // Démarrage de l'API
        app.listen(process.env.SERVER_PORT, () => {console.table(`Server running on port ${process.env.SERVER_PORT}!`)})
        console.log("MongoDB on!")
    })
    .catch(() => console.log("MongoDB failed!"));