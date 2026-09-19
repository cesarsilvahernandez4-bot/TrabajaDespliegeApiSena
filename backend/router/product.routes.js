const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// CRUD de productos, todas las rutas están protegidas
router.get('/', verifyToken, productCtrl.getProducts);
router.post('/', verifyToken, productCtrl.createProduct);
router.get('/:id', verifyToken, productCtrl.getProduct);
router.put('/:id', verifyToken, productCtrl.editProduct);
router.delete('/:id', verifyToken, productCtrl.deleteProduct);

module.exports = router;
