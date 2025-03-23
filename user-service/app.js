// app.js
require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models/index');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.Node_PORT || 7000;

app.use(express.json());
app.use('/users', userRoutes);

// Initialisation de la base de données (synchronisation des tables)
const init = async () => {
  try {
    await sequelize.sync({ alter: true });  // alter ou force selon vos besoins (attention à la perte de données avec force)
    console.log("Base de données connectée et tables synchronisées");
    app.listen(PORT, () => {
      console.log(`User Service est démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
  }
};

init();

module.exports = app; // Pour pouvoir tester avec des outils comme Postman ou des tests automatisés
