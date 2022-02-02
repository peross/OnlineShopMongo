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

module.exports = {
    getProducts: getProducts,
    getNewProduct: getNewProduct,
    addNewProduct: addNewProduct,
}