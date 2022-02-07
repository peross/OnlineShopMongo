const Order = require('../models/order-model');
const User = require('../models/user-model');

function getOrders(req, res){
    res.render('customer/orders/all-orders');
}

async function addOrder(req, res, next){
    const cart = res.locals.cart; //access to the cart

    let userDocument;
    try {
        userDocument = await User.findUserById(res.locals.uid);
    } catch (error) {
        next(error);
        return;
    }
    const order = new Order(cart, userDocument);

    try {
        await order.save();
    } catch (error) {
        next(error);
        return;
    }

    req.session.cart = null; //clear cart

    res.redirect('/orders');
}

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders,
}