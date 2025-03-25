const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Endpoint pour acheter des billets
router.post('/buy', ticketController.buyTicket);

// Endpoint pour récupérer les billets d'un utilisateur
router.get('/user/:userId', ticketController.getTicketsByUser);

module.exports = router;
