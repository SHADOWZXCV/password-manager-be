const signInRouter = require('@Route/signin');
const signupRouter = require('@Route/signup/users');
const passport = require('passport');

module.exports = (app) => {
    app.use('/signin', signInRouter);
    app.use('/signup', signupRouter);

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        return res.redirect('/dashboard');
    });
};
