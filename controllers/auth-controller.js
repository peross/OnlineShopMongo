const User = require('../models/user-model');

const bcrypt = require('bcrypt');

async function signup(req, res, next){
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.name,
        req.body.surname,
        req.body.street,
        req.body.postal,
        req.body.city);

    await user.signup();

    console.log(user);

    res.redirect('/login');
}

function getLogin(req, res){
    res.render('customer/auth/login');
}

function getSignUp(req, res){
    res.render('customer/auth/signup');
}

module.exports = {
    getLogin: getLogin,
    getSignUp: getSignUp,
    signup: signup,
}