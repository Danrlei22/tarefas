const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();

// Usando CORS para permitir requisições de qualquer origem
server.use(cors()); // Ativa o CORS
server.use(middlewares);
server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});
