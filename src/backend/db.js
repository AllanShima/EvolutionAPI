const mysql = require('mysql2/promise');
require('dotenv').config();

// Adicione este log para verificar se as variáveis de ambiente estão carregando
console.log('Tentando conectar ao banco:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

module.exports = require('mysql2').createConnection({
  host: process.env.DB_HOST || 'mysql', // Nome do serviço no compose
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'evolution'
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'host.docker.internal', // valor padrão caso não exista no .env
  user: process.env.DB_USER || 'root',      // valor padrão comum
  password: process.env.DB_PASSWORD || '',  // senha padrão vazia para desenvolvimento
  database: process.env.DB_NAME || 'test',  // nome de banco padrão
port: process.env.DB_PORT || 3306, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000 // 10 segundos de timeout
});

// Teste de conexão ao iniciar
pool.getConnection()
  .then(conn => {
    console.log('✅ Conexão com MySQL estabelecida com sucesso!');
    conn.release(); // libera a conexão de volta para o pool
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
    console.error('Verifique:');
    console.error('- Servidor MySQL está rodando?');
    console.error('- Credenciais no arquivo .env estão corretas?');
    console.error('- Usuário tem permissões no banco especificado?');
  });

module.exports = pool;