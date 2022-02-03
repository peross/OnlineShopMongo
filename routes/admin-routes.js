const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin-controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.addNewProduct);

router.get('/products/:id', adminController.getNewProduct, adminController.getUpdateProduct);

router.post('/products/:id', adminController.getNewProduct, adminController.updateProduct)

module.exports = router;