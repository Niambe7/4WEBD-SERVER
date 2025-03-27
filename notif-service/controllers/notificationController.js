// notif-service/controllers/notificationController.js
const nodemailer = require('nodemailer');

exports.sendEmailNotification = async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    if (!to || !subject || !text) {
      return res.status(400).json({ message: 'Les champs "to", "subject" et "text" sont requis.' });
    }
    
    // Créer le transporteur SMTP en utilisant les variables d'environnement
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true', // true pour 465, false pour 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    // Envoyer l'email
    let info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      text: text,
      // html: '<b>Votre achat a été confirmé</b>' // Optionnel : contenu HTML
    });
    
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: 'Notification envoyée avec succès', info });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de la notification', error: error.message });
  }
};
