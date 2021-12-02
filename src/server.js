// Importar bibliotesca
const express = require('express');
const cors = require('cors');

// Instanciar server
const app = express();

// Chamar rotas
const routes = require('./app/routes');

// Importar conexão com banco de dados
require('./database');

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/', routes);


// Escutar uma porta
app.listen(3001);