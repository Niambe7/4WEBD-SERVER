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

    // Utiliser le nom de service Docker pour récupérer l'événement
    const eventResponse = await axios.get(`http://event-service:7004/events/${eventId}`);
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

    const baseUrl = "http://localhost:7004"; // URL interne du service event
    const eventImageUrl = event.image ? `${baseUrl}/${event.image.replace(/\\/g, '/')}` : null;

    // Créer le ticket en sauvegardant une "photo instantanée" des infos de l'événement
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

    // Récupérer les informations de l'utilisateur depuis le user-service
    const userResponse = await axios.get(`http://user-service:7000/users/${userId}`);
    const user = userResponse.data;
    const email = user.email;

    // Préparer le contenu du mail de confirmation
    const subject = "Confirmation d'achat de ticket";
    const text = `Bonjour ${user.firstname},\n\nVotre achat de ticket pour l'événement "${event.title}" a été confirmé.\nMerci !`;

    // Appeler notif-service pour envoyer l'email
    await axios.post(`http://notif-service:7007/notif/send`, {
      to: email,
      subject: subject,
      text: text
    });


    res.status(201).json({ message: 'Paiement , réservation et notification effectués avec succès', ticket, charge });
  } catch (error) {
    console.error("Erreur lors de l'achat de billet :", error.response ? error.response.data : error);
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
