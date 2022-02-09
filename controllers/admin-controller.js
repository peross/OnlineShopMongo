const Category = require('../models/category-model');
const Product = require('../models/product-model');
const Order = require('../models/order-model');

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
        await product.save(cat);    
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
        // console.log(product);
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

    if(req.file){
        product.replaceImage(req.file.filename);
    }

    try { 
        await product.save();
    } catch (error) {
        next(error);
        return;
    }

    res.redirect('/admin/products');
}

async function deleteProduct(req, res, next){
    let product;
    try {
        product = Product.findProductById(req.params.id);
        (await product).remove();
    } catch (error) {
        next(error);
        return;
    }
    // res.redirect('/admin/products');
    res.json({message: 'Artikl obrisan'});
}

async function getOrders(req, res, next){
    let orders;
    try {
        orders = await Order.findAllOrders();
        res.render('admin/orders/admin-order', {orders: orders})
    } catch (error) {
        next(error);
        return;
    }
}

async function updateOrder(req, res, next){
    const orderId = req.params.id;
    const newStatus = req.body.newStatus;

    // console.log(newStatus);
    try {
        const order = await Order.findOrdersById(orderId);
        order.status = newStatus;
        
        await order.save();

        res.json({
            message: 'Artikl azuriran',
            newStatus: newStatus
        });
    } catch (error) {
        next(error);
        return;
    }
}

module.exports = {
    getProducts: getProducts,
    getNewProduct: getNewProduct,
    addNewProduct: addNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getOrders: getOrders,
    updateOrder: updateOrder
}