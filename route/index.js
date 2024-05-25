const signInRouter = require('@Route/signin');
const vaultsRouter = require('@Route/protected/vaults');
const passport = require('passport');

module.exports = (app) => {
    app.use('/signin', signInRouter);
    app.use('/vaults', vaultsRouter);

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/signin' }, (err, user, info) => {console.log(err, user, info)}),
    (req, res) => {
        console.log(req.user);
        return res.redirect('/dashboard');
    });
    app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/signin' }),
    (req, res) => {
        return res.redirect('/dashboard');
    });
};
