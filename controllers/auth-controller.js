const User = require('../models/user-model');
const authUtil = require('../util/authentication');

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

async function login(req, res, next){
    const user = new User(req.body.email, req.body.password);
    const existingUser = await user.getUserWithSameEmail(); 

    if(!existingUser){
        res.redirect('/login');
        return;
    }

    const passwordIsCorrect = await user.comparePassword(existingUser.password);

    if(!passwordIsCorrect){
        res.redirect('/login');
        return;
    }

    authUtil.createUserSessions(req, existingUser, () => {
        res.redirect('/');
    });
}

function logout(req, res){
    authUtil.destroyUserAuthSession(req);
    res.redirect('/');
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
    login: login,
    logout: logout,
}