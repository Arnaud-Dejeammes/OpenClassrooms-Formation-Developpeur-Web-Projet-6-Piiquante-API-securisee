// Serveur pour l'écoute et l'attente de requêtes http
// *********************** //
// Importation des modules //
// *********************** //

// Création d'une application Express (importation du module)
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// ********************************** //
// Importation des modules de routage //
// ********************************** //
const sauceRoutes = require("./routes/sauces");
const authRoutes = require("./routes/users");

// Traitement des requêtes vers la route /image avec un dossier images statique
const path = require("path");

// Appel de la méthode pour l'application
const app = express();

// ****************************************************************************** //
// Middleware généraliste pour le partage des ressources entre origines multiples //
// ****************************************************************************** //
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: "Origin, X-Requested-With, X-Access-Token, Role, Content, Accept, Content-Type, Authorization"
}));

// Gestion de la requête POST (middleware du framework Express : prend les requêtes avec le Content-Type application/json, et met le body sur l'objet request)
// Analyse le corps de la requête et remplace l'ancien module body-parser
app.use(express.json());

app.use(express.urlencoded({extended: true}));

// ******* //
// Routage //
// ******* //
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", sauceRoutes);
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
        console.log("MongoDB on!");
    })
    .catch(() => console.log("MongoDB failed!"));