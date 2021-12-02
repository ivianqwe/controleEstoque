// Importar bibliotecas
const express = require('express');
const router = express.Router();

// Importar controles
const productsController = require('./controller/productsController');
const usersControler = require('./controller/usersController');
const movimentsControler = require('./controller/movimentsController');
const stocksControler = require('./controller/stocksController');
const allocationsControler = require('./controller/allocationsController');

// Rotas 
router.get('/products', productsController.index);
router.post('/products', productsController.store);
router.delete('/products/:id', productsController.delete);

router.get('/users', usersControler.index);
router.post('/users', usersControler.store);
router.delete('/users/:id', usersControler.delete);

router.get('/moviments', movimentsControler.index);
router.post('/users/:user_id/moviments', movimentsControler.store);
router.delete('/moviments/:id', movimentsControler.delete);

router.get('/stocks', stocksControler.index);
router.post('/stocks', stocksControler.store);
router.delete('/stocks/:id', stocksControler.delete);

router.get('/allocations', allocationsControler.index);
router.post('/allocations/stock/:stock_id', allocationsControler.store);
router.delete('/allocations/:id', allocationsControler.delete);

module.exports = router;