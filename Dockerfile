FROM node:18-alpine

# Define o diretório de trabalho para a pasta do backend
WORKDIR /usr/src/app/src/backend

# 1. Copia os arquivos de dependência
COPY src/backend/package*.json ./

# 2. Instala as dependências
RUN npm install

# 3. Copia todo o conteúdo do backend
COPY src/backend/ .

# 4. Expõe a porta
EXPOSE 3000

# 5. Comando de execução
CMD ["node", "server.js"]