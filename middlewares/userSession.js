function userSession(req, res, next){
    res.locals.userSession = req.session.userSession;
    next();
}

module.exports = userSession;