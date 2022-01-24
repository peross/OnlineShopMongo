const Product = require('../models/product-model');

async function getAllProducts(req, res, next){
    try{
        const product = await Product.findAllProducts();
        res.render('customer/products/all-products', {product: product});
    } catch(error){
        next(error);
        return;
    }
}

module.exports = {
    getAllProducts: getAllProducts,
}