const checkUserAuthentication = (req, res, next) => {
    if(!req.isAuthenticated())
        return res.status(401).end();

    next();
}

module.exports = {
    checkUserAuthentication
};
