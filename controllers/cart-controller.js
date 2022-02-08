const Product = require('../models/product-model');

async function addCartItem(req, res, next){
    let product;
    try {
        product = await Product.findProductById(req.body.productId);
    } catch (error) {
        next(error);
        return;
    }
    const cart = res.locals.cart;
    cart.addItem(product);
    req.session.cart = cart; //update cart

    res.status(201).json({
        message: 'Korpa azurirana',
        newTotalItems: cart.totalQuantity
    }); //successfully added date
}

function getCart(req, res) {
    res.render('customer/cart/cart');
}

function updateCartItem(req, res){
    const cart = res.locals.cart;
    const updatedItemData = cart.updateItem(req.body.productId, +req.body.quantity);

    req.session.cart = cart;
    res.json({
        message: 'Artikl azuriran',
        updateCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice
        }
    })
}   

module.exports = {
    addCartItem: addCartItem,
    getCart: getCart,
    updateCartItem: updateCartItem,
}