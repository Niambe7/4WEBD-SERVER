# Dockerfile (pour le frontend en mode développement)
FROM node:16

WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port de l'application (ici 3000)
EXPOSE 3000

# Lancer le serveur de développement
CMD ["npm", "start"]
