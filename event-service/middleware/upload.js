// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Assurez-vous que le dossier "uploads" existe
  },
  filename: function (req, file, cb) {
    // Créer un nom unique pour éviter les collisions
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'event-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtrer les fichiers pour accepter uniquement les images (optionnel)
const fileFilter = (req, file, cb) => {
  // Accepter uniquement les fichiers d'images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non supporté, uniquement les images sont autorisées.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
