# event-service/Dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Exposer le port de votre event-service (par exemple, 7004)
EXPOSE 7006

CMD ["node", "app.js"]
