// models/Ticket.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ticket = sequelize.define('Ticket', {
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  // Champs supplémentaires pour conserver les informations de l'événement
  eventTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  eventVenue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventImage: {
    type: DataTypes.STRING, // ou TEXT si c'est une URL longue
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Ticket;
