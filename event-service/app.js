// app.js
require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models/index');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.Node_PORT || 7004;

app.use(express.json());

// Déclaration des routes pour les événements
app.use('/events', eventRoutes);

// Synchronisation de la base de données et démarrage du serveur
const init = async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log("Base de données connectée et tables recréées");
      app.listen(PORT, () => {
        console.log(`Event Service est démarré sur le port ${PORT}`);
      });
    } catch (error) {
      console.error("Erreur lors de la connexion à la base de données :", error);
    }
  };

init();

module.exports = app;
