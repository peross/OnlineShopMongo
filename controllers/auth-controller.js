function getLogin(req, res){
    res.render('customer/auth/login');
}

function getSignUp(req, res){
    res.render('customer/auth/signup');
}

module.exports = {
    getLogin: getLogin,
    getSignUp: getSignUp,
}