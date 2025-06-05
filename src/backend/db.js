const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../../.env' });

// Configuração centralizada
const dbConfig = {
  host: process.env.DB_HOST || 'mysql', // Nome do serviço no compose
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'TrayWhatsDB', // Nome do seu banco
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000 // 10 segundos
};

// Log de debug (opcional)
console.log('Configuração do banco:', {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database
});

// Criação do pool de conexões
const pool = mysql.createPool(dbConfig);

// Função de teste de conexão (opcional)
async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('✅ Conexão com MySQL estabelecida com sucesso!');
    await conn.query('SELECT 1 + 1 AS result');
  } catch (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
    console.error('Verifique:');
    console.error('- Servidor MySQL está rodando?');
    console.error('- Credenciais no .env estão corretas?');
    console.error('- Banco de dados existe?');
    throw err; // Propaga o erro para falha explícita
  } finally {
    if (conn) conn.release();
  }
}

// Testa a conexão ao iniciar (opcional)
testConnection().catch(() => process.exit(1));

// Exporta apenas o pool
module.exports = pool;