// Importar bibliotesca
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// Buscar rotas
const routes = require('./app/routes');

// Importar variaveis de ambiente
require('dotenv/config');
// Importar conexão com banco de dados
require('./database');

class App{
    constructor(){
        // Instanciar server
        this.server = express();

        // Chamar métodos
        this.middlewares();
        this.routes();
    }

    middlewares(){
        // Converter requisição para JSON
        this.server.use(express.json());
        // Permitir acesso pelo Front
        this.server.use(cors());
        // Adicionar configs de segurança para o app
        this.server.use(helmet());
    }

    routes(){
        // Buscar rotas
        this.server.use('/', routes);
    }
}

module.exports = new App().server;
