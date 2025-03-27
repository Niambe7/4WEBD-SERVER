// notif-service/app.js
if (!process.env.EMAIL_HOST) {
    require('dotenv').config();
  }
  
  const express = require('express');
  const cors = require('cors');
  const notificationRoutes = require('./routes/notificationRoutes');
  
  const app = express();
  const PORT = process.env.Node_PORT || 7007;
  
  app.use(cors());
  app.use(express.json());
  
  app.use('/notif', notificationRoutes);
  
  app.listen(PORT, () => {
    console.log(`Notification Service est démarré sur le port ${PORT}`);
  });
  
  module.exports = app;
  