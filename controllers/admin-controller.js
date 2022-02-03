const { registry } = require('gulp');
const Category = require('../models/category-model');
const Product = require('../models/product-model');

async function getProducts(req, res, next) {
    try {
        const products = await Product.findAllProducts();
        res.render('admin/products/all-products', {products: products});
    } catch (error) {
        next(error);
        return;
    }
}

async function getNewProduct(req, res, next) {
    try {
        const categorys = await Category.getAllCategorys();
        res.render('admin/products/new-product', {categorys: categorys});
    } catch (error) {
        next(error);
        return;
    }
}

async function addNewProduct(req, res, next) {
    let cat = req.body.category;
    console.log(cat);
    const product = new Product({
        ...req.body,
        image: req.file.filename
    });

    try {
        await product.save();    
    } catch (error) {
        next(error);
        return;
    }

    res.redirect('/admin/products');
}

async function getUpdateProduct(req, res, next){
    try {
        const product = await Product.findProductById(req.params.id); //values entered in the url
        res.render('admin/products/update-product', {product: product});
        console.log(product);
    } catch (error) {
        next(error);
        return;
    }
}

async function updateProduct(req, res, next){
    const product = new Product({
        ...req.body,
        _id: req.params.id
    });
    try { 
        await product.save();
    } catch (error) {
        next(error);
        return;
    }

    res.redirect('/admin/products');
}

module.exports = {
    getProducts: getProducts,
    getNewProduct: getNewProduct,
    addNewProduct: addNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct,
}