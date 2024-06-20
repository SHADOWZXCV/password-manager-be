const passport = require('passport');
const signInRouter = require('@Route/signin');
const userAuthRouter = require('@Route/protected');
const vaultsRouter = require('@Route/protected/vaults');
const vaultsEntriesRouter = require('@Route/protected/vaultsEntries');
const workspacesRouter = require('@Route/protected/workspaces');

const configureRoutes = app => {
    app.use('/signin', signInRouter);
    app.use('/authorize', userAuthRouter);
    // for some reason, the order of the next 2 routes is important, or the
    // route validator's req.path logic breaks.
    app.use('/vaults/entries', vaultsEntriesRouter);
    app.use('/vaults', vaultsRouter);
    app.use('/workspaces', workspacesRouter);

    configurePassportRoutes(app);
};

const configurePassportRoutes = app => {
    app.get('/signout', (req, res) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            return res.sendStatus(200);
        })
    });
    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/signin' }),
    redirectToDashboard);
    app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/signin' }),
    redirectToDashboard);
}

const redirectToDashboard = (req, res) => {
    return res.sendStatus(200);
}

module.exports = configureRoutes
