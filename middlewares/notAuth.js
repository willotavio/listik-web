function notAuth(req, res, next){
    if(!req.session.userSession){
        next();
    }
    else{
        res.redirect('/');
    }
}

module.exports = notAuth;