const db = require('../data/database');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/products');
});

// router.get('/products', async(req, res) => {
//     const [products] = await db.query('select * from products');
//     res.render('customer/products/all-products', {products: products});
// });

module.exports = router;