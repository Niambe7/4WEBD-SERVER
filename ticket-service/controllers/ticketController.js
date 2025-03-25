// controllers/ticketController.js
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Ticket } = require('../models/index');
const axios = require('axios');

exports.buyTicket = async (req, res) => {
    try {
      const { eventId, userId, quantity, token } = req.body;
  
      if (!eventId || !userId || !quantity || !token) {
        return res.status(400).json({ message: 'eventId, userId, quantity et token sont requis.' });
      }
  
      // Vérifier l'existence de l'événement via Event Service
      const eventResponse = await axios.get(`http://localhost:7004/events/${eventId}`);
      const event = eventResponse.data;
      if (!event) {
        return res.status(404).json({ message: "Événement non trouvé." });
      }
  
      // Calculer le montant total en centimes
      const unitPrice = parseFloat(event.price);
      const totalAmount = Math.round(unitPrice * quantity * 100); // en centimes
  
      // Créer une charge avec Stripe
      const charge = await stripe.charges.create({
        amount: totalAmount,
        currency: 'eur',
        source: token,
        description: `Achat de ${quantity} billet(s) pour l'événement "${event.title}"`
      });
  

      const baseUrl = "http://localhost:7004"; // L'URL de votre service d'événements qui sert les images
      const eventImageUrl = event.image ? `${baseUrl}/${event.image.replace(/\\/g, '/')}` : null;
      
      // Puis, lors de la création du ticket :
      const ticket = await Ticket.create({
        eventId,
        userId,
        quantity,
        purchaseDate: new Date(),
        eventTitle: event.title,
        eventDate: event.date,
        eventVenue: event.venue,
        eventImage: eventImageUrl
      });
  
      res.status(201).json({ message: 'Paiement et réservation effectués avec succès', ticket, charge });
    } catch (error) {
      console.error("Erreur lors de l'achat de billet :", error);
      res.status(500).json({ message: 'Erreur lors du paiement ou de la réservation', error: error.message });
    }
  };


exports.getTicketsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const tickets = await Ticket.findAll({ where: { userId } });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
