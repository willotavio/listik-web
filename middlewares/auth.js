function auth(req, res, next){
    if(req.session.userSession){
        next();
    }
    else{
        res.redirect('/');
    }
}

module.exports = auth;