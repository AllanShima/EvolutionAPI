FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Adicione esta linha para garantir que as variáveis sejam carregadas
RUN echo "DB_HOST=mysql" >> .env && \
    echo "DB_USER=root" >> .env && \
    echo "DB_PASSWORD=root" >> .env && \
    echo "DB_NAME=TrayWhatsDB" >> .env

EXPOSE 3000

CMD ["node", "src/backend/server.js"]