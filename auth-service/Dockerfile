# auth-service/Dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install
# Rebuild bcrypt pour l'environnement Linux (si vous restez sur bcrypt natif)
RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 7002

CMD ["node", "app.js"]
