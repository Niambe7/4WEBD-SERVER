// notif-service/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Endpoint pour envoyer une notification par email
router.post('/send', notificationController.sendEmailNotification);

module.exports = router;
