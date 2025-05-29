Pra rodar a Evo API, basta copiar os arquivos do projeto
Atualiza o prisma e o npm

npm i --save-dev prisma@latest                     
npm i @prisma/client@latest

Pra rodar:
- Abra o Docker Desktop (ou instala primeiro);
- Roda no terminal "docker compose up -d"

Sempre que quiser iniciar ele, aperta Play direto no docker, ou digita no terminal do projeto "docker compose up"

Para visualizar o endereço da API. Clica no link que aparece em 'evolution api' no Docker.

Siga os comandos a seguir para manuseiar o projeto:

docker-compose down (Parar e Remover os Containers (mantendo volumes e redes))
docker-compose up -d (Subir Novamente)
docker-compose restart (einício Rápido (Apenas Containers) sem recriá-los)

---------

Para recomçar tudo do início (incluindo o banco de dados)

docker-compose down -v
docker-compose up -d --build

-------

Essa API foi amplamente usada no projeto da faculdade sobre Campanhas de Whatsapp para a empresa Tray de Marília.

OBS:
- A versão precisa ser 2.2.0 pra conseguir criar os grupos do whats através de uma instância.