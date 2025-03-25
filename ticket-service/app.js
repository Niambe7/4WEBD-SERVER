if (!process.env.DB_NAME) {
  require('dotenv').config();
}
const express = require('express');
const { sequelize } = require('./models/index');
const ticketRoutes = require('./routes/ticketRoutes');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
const PORT = process.env.Node_PORT || 7006;

app.use(express.json());
app.use('/tickets', ticketRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const init = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Base de données connectée et tables synchronisées");
    app.listen(PORT, () => {
      console.log(`Ticket Service est démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
  }
};

init();

module.exports = app;
