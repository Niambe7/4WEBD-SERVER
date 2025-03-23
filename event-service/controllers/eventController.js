const { Event } = require('../models/index');

// Créer un événement
exports.createEvent = async (req, res) => {
    try {
      // Pour Multer, les champs envoyés par form-data sont dans req.body
      // et le fichier uploadé est dans req.file (si vous utilisez upload.single('image'))
      const { title, date, venue, artist, price } = req.body;
      // Si vous stockez juste le chemin de l'image, par exemple :
      const image = req.file ? req.file.path : null;
      
      const event = await Event.create({
        title,
        date,
        venue,
        artist,
        price,
        image
      });

      if (event.image) {
        event.image = event.image.replace(/\\/g, '/');
      }
      
      res.status(201).json({ message: 'Événement créé avec succès', event });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Récupérer tous les événements
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un événement par son ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Événement non trouvé' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un événement
exports.updateEvent = async (req, res) => {
    try {
      console.log("Données form-data reçues:", req.body);
      if (req.file) {
        console.log("Fichier reçu:", req.file);
      }
      const event = await Event.findByPk(req.params.id);
      if (!event) return res.status(404).json({ message: 'Événement non trouvé' });
  
      // Si un nouveau fichier a été envoyé, mettez à jour la valeur de l'image, sinon laissez l'existante
      const updateData = { ...req.body };
      if (req.file) {
        updateData.image = req.file.path; // ou éventuellement normaliser le chemin
      }
  
      await event.update(updateData);
      res.json({ message: 'Événement mis à jour', event });
    } catch (error) {
      console.error("Erreur lors de l'update:", error);
      res.status(400).json({ message: error.message });
    }
  };
  

// Supprimer un événement
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Événement non trouvé' });
    await event.destroy();
    res.json({ message: 'Événement supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
