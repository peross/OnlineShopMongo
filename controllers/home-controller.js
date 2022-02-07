function getHome(req, res, next){
    res.render('base/includes/home');
}

module.exports = {
    getHome: getHome,
}