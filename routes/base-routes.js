const db = require('../data/database');

const express = require('express');

const homeController = require('../controllers/home-controller');

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/home');
});

router.get('/home', homeController.getHome);

// router.get('/products', async(req, res) => {
//     const [products] = await db.query('select * from products');
//     res.render('customer/products/all-products', {products: products});
// });

module.exports = router;