// *********************** //
// Importation des modules //
// *********************** //
const multer = require("multer");

const MIME_TYPES = {
    "image/gif": "gif",
    "image/jpg": "jpg",
    "images/jpeg": "jpg",
    "images/png": ".png",
    "image/webp": "webp"
};

// ****************************************************** //
// Stockage des images sur le système local de fichiers   //
// ****************************************************** //
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "images");
    },
    filename: (request, file, callback) => {
        const name = file.originalname.split(" ").join("");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    }
});

module.exports = multer({storage: storage}).single("image");