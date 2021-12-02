// Importar bibliotecas
const Sequelize = require('sequelize');
const dbConfig = require('../config/dataBase');

// Importar Models
const Product = require('../app/models/Product');
const User = require('../app/models/User');
const Moviments = require('../app/models/Moviments');
const MovimentsItems = require('../app/models/MovimentsItems');
const Stock = require('../app/models/Stock');
const Allocation = require('../app/models/Allocations');

// Conectar ao banco
const connection = new Sequelize(dbConfig);

// User conexão
Product.init(connection);
User.init(connection);
Moviments.init(connection);
MovimentsItems.init(connection);
Stock.init(connection);
Allocation.init(connection);

// Associar Models
Product.associate(connection.models);
User.associate(connection.models);
Moviments.associate(connection.models);
MovimentsItems.associate(connection.models);
Stock.associate(connection.models);

module.exports = connection;