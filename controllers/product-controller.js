const Product = require('../models/product-model');

async function getAllProducts(req, res, next){
    let categoryName = 'Doručak';

    try{
        const products = await Product.findAllProducts(categoryName);
        res.render('customer/products/all-products', {products: products});
    } catch(error){
        next(error);
        return;
    }
}

async function getCategory(req, res, next) {
    let categoryName = req.params.categoryName;

    console.log(categoryName);

    try {
        const products = await Product.findAllProducts(categoryName);
        res.json(products);
    } catch (error) {
        next(error);
        return;
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    getCategory: getCategory,
}