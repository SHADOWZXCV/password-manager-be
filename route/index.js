const signInRouter = require('@Route/signin');
const signupRouter = require('@Route/signup/users');
const passport = require('passport');

module.exports = (app) => {
    app.use('/signin', signInRouter);
    // app.use('/signup', signupRouter);

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/signin' }),
    (req, res) => {
        return res.redirect('/dashboard');
    });
    app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/signin' }),
    (req, res) => {
        return res.redirect('/dashboard');
    });
};
