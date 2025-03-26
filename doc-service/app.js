// doc-service/app.js
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');

const app = express();

// Autoriser toutes les origines pour le développement
app.use(cors());

// Charger le fichier swagger.yaml
const swaggerFile = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = yaml.load(swaggerFile);

// Servir Swagger UI sur l'endpoint /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.Node_PORT || 7008;
app.listen(PORT, () => {
  console.log(`Doc Service est démarré sur le port ${PORT}`);
});
