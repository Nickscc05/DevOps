const http = require('node:http');
const os = require('node:os');
const { Pool } = require('pg');

const port = Number(process.env.PORT || 3000);
const instance = process.env.INSTANCE_NAME || os.hostname();

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'training',
  user: process.env.DB_USER || 'training_app',
  password: process.env.DB_PASSWORD || 'training_password',
  max: 5,
  connectionTimeoutMillis: 4000
});

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  });
  response.end(JSON.stringify(payload));
}

const server = http.createServer(async (request, response) => {
  if (request.url === '/health') {
    return sendJson(response, 200, { status: 'ok', service: 'training-api' });
  }

  if (request.url === '/api/items') {
    try {
      const result = await pool.query('SELECT id, name FROM items ORDER BY id');
      return sendJson(response, 200, { instance, items: result.rows });
    } catch (error) {
      console.error('Falha ao consultar o banco:', error.message);
      return sendJson(response, 500, {
        error: 'Não foi possível consultar o banco',
        detail: error.message
      });
    }
  }

  return sendJson(response, 404, { error: 'Rota não encontrada' });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`training-api ouvindo na porta ${port}`);
});

function shutdown() {
  server.close(() => pool.end(() => process.exit(0)));
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
