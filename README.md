Aqui há duas APIs, uma é a Evolution, api não oficial do whats que contém seus próprios requests com uma url separada
A outra API, "minha_api_node" é uma api para inserir dados que serão utilizados no front do site.
O container do docker já possui um servidor do Mysql, então antes de fazer qualquer request, crie o banco de dados manualmente primeiro

Instala o projeto, e siga os passos:

"npm install" (instalar dependencias)

Atualiza o prisma e o npm

npm i --save-dev prisma@latest                     
npm i @prisma/client@latest

Pra rodar:
- Abra o Docker Desktop (ou instala primeiro);
- Roda no terminal "docker compose up -d"

No Mysql Workbench, crie o banco de dados com o arquivo "meuBancoDeDados.sql"

Sempre que quiser iniciar ele, aperta Play direto no docker, ou digita no terminal do projeto "docker compose up"

Para visualizar o endereço da API. Clica no link que aparece em 'evolution api' no Docker.

Siga os comandos a seguir para manuseiar o projeto:

docker-compose down (Parar e Remover os Containers (mantendo volumes e redes))
docker-compose up -d (Subir Novamente)
docker-compose restart (einício Rápido (Apenas Containers) sem recriá-los)

---------

Sempre que fazer qualquer alteração principalmente nos controllers ou routes, reinicie todo o projeto:

docker-compose down -v
docker-compose up -d --build

-------

Essa API foi amplamente usada no projeto da faculdade sobre Campanhas de Whatsapp para a empresa Tray de Marília.

OBS:
- A versão precisa ser 2.2.0 pra conseguir criar os grupos do whats através de uma instância.