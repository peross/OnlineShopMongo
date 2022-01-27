function getHome(req, res, next){
    res.render('base/home');
}

module.exports = {
    getHome: getHome,
}