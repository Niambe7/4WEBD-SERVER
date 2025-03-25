// models/index.js
const sequelize = require('../config/database');
const Ticket = require('./Ticket');

module.exports = { sequelize, Ticket };
