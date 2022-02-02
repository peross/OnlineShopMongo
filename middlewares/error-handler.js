function handleErrors(error, req, res, next){
    res.status(500).render('base/500');
}

module.exports = handleErrors;