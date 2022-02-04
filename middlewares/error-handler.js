function handleErrors(error, req, res, next){
    if(error.code === 4040){
        return res.status(404).render('base/404');
    }
    res.status(500).render('base/500');
}

module.exports = handleErrors;