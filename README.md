Pra rodar a Evo API, basta copiar os arquivos do projeto
Atualiza o prisma e o npm

npm i --save-dev prisma@latest                     
npm i @prisma/client@latest

Pra rodar:
- Abra o Docker Desktop (ou instala primeiro);
- cd "C:\Users\allan\Desktop\Projetos VSCODE\API\EvolutionAPI\src\backend"
- Roda no terminal "docker compose up -d"

Sempre que quiser iniciar ele, aperta Play direto no docker, ou digita no terminal do projeto "docker compose up"

Para visualizar o endereço da API. Clica no link que aparece em 'evolution api' no Docker.

-------

Essa API foi amplamente usada no projeto da faculdade sobre Campanhas de Whatsapp para a empresa Tray de Marília.

OBS:
- A versão precisa ser 2.2.0 pra conseguir criar os grupos do whats através de uma instância.