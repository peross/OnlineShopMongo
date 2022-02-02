const User = require('../models/user-model');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionDataFlash = require('../util/session-flash');

function getSignUp(req, res){
    let sessionData = sessionDataFlash.getSessionData(req);
    if(!sessionData){
        sessionData = {
            email: '',
            confirmEmail: '',
            password: '',
            name: '',
            surname: '',
            street: '',
            postal: '',
            city: '',
        };
    }
    res.render('customer/auth/signup', {inputData: sessionData});
}

async function signup(req, res, next){
    const enteredData = {
        email: req.body.email,
        confirmEmail: req.body['confirm-email'],
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        street: req.body.street,
        postal: req.body.postal,
        city: req.body.city
    }
    //user input validation
    if(!validation.userDetailsAreValid(
        req.body.email,
        req.body.password,
        req.body.name,
        req.body.surname,
        req.body.street,
        req.body.postal,
        req.body.city) || !validation.emailIsConfirmed(req.body.email, req.body['confirm-email'])) {
               
        sessionDataFlash.flashDataToSession(req, {
            errorMessage: 'Molimo Vas provjerite unesene podatke.',
            ...enteredData
        }, () => {
            res.redirect('/signup');
        })
        return;
    }

    //get input data
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.name,
        req.body.surname,
        req.body.street,
        req.body.postal,
        req.body.city
            );

    try {
        //check if user try to create user which already exists
        const existsAlready = await user.userExistsAlready();

        if(existsAlready){
            sessionDataFlash.flashDataToSession(req, {
                errorMessage: 'Korisnik već postoji!',
                ...enteredData
            }, () => {
                res.redirect('/signup');
            })
            return;
        }
        //after check inputs are valid, create new user
        await user.signup();
        // console.log(user);
    } catch (error) {
        next(error);
        return;
    }
        
    res.redirect('/login');
}

function getLogin(req, res){
    let sessionData = sessionDataFlash.getSessionData(req);
    if(!sessionData){
        sessionData = {
            email: '',
            password: '',
        };
    }
    res.render('customer/auth/login', {inputData: sessionData});
}

async function login(req, res, next){
    const user = new User(req.body.email, req.body.password);

    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail(); 
    } catch (error) {
        next(error);
        return;
    }

    const sessionErrorData = {
        errorMessage: 'Neispravni podaci! Provjerite da li ste unijeli ispravno email i lozinku.',
        email: user.email,
        password: user.password
    }

    if(!existingUser){
        sessionDataFlash.flashDataToSession(req, sessionErrorData, () => {
            res.redirect('/login');
        })
        return;
    }

    const passwordIsCorrect = await user.comparePassword(existingUser.password);

    if(!passwordIsCorrect){
        sessionDataFlash.flashDataToSession(req, sessionErrorData, () => {
            res.redirect('/login');
        })
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

module.exports = {
    getSignUp: getSignUp,
    getLogin: getLogin,
    signup: signup,
    login: login,
    logout: logout,
}