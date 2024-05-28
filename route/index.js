const signInRouter = require('@Route/signin');
const vaultsRouter = require('@Route/protected/vaults');
const passport = require('passport');
const vaultsEntriesRouter = require('@Route/protected/vaultsEntries');

module.exports = (app) => {
    app.use('/signin', signInRouter);
    // for some reason, the order of the next 2 routes is important, or the
    // route validator's req.path logic breaks.
    app.use('/vaults/entries', vaultsEntriesRouter);
    app.use('/vaults', vaultsRouter);

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/signin' }),
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
