const Product = require('../models/product-model');

async function getAllProducts(req, res, next){
    let search = req.query.search;
    try{
        const products = await Product.findAllProducts(search);
        res.render('customer/products/all-products', {products: products});
    } catch(error){
        next(error);
        return;
    }
}

async function getProductDetails(req, res, next){
    try {
        const product = await Product.findProductById(req.params.id);
        res.render('customer/products/product-details', {product: product});
    } catch (error) {
        next(error);
        return;
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductDetails: getProductDetails,
}