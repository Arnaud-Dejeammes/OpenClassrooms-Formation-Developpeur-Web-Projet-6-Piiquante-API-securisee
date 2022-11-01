// *********************** //
// Importation des modules //
// *********************** //
const multer = require("multer");

// ********************************************* //
// Conversion des extensions de noms de fichiers //
// ********************************************* //
const MIME_TYPES = {
    "image/gif": "gif",
    "image/jpg": "jpg",
    "images/jpeg": "jpg",
    "images/png": "png",
    "image/webp": "webp"
};

// ****************************************************** //
// Stockage et dénomination des images dans le système local de fichiers   //
// ****************************************************** //
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "images");
    },    
    filename: (request, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);

        // if (extension === "gif" || extension === "jpg" || extension === "png" || extension === "webp") {
        //     callback(null, true);
        // } else {
        //     callback("Format d'image non pris en charge", false)
        // }
    }
});

module.exports = multer({storage: storage}).single("image");