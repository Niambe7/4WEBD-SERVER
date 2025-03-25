// app.js
if (!process.env.DB_NAME) {
  require('dotenv').config();
}

const express = require('express');
const { sequelize } = require('./models/index');
const authRoutes = require('./routes/authRoutes');

const app = express();
const cors = require('cors');
const PORT = process.env.Node_PORT || 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));


// Routes d'authentification
app.use('/auth', authRoutes);

// Initialisation de la base de données et démarrage du serveur
const init = async () => {
  try {
    await sequelize.sync({ alter: true }); // alter pour mettre à jour la structure sans supprimer les données existantes
    console.log("Base de données connectée et tables synchronisées");
    app.listen(PORT, () => {
      console.log(`Auth Service est démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
  }
};

init();

module.exports = app; // Pour les tests éventuels
