const logger = require('@Util/log');
const passport = require('passport');

const redirectToGoogleAuth = passport.authenticate('google', {  scope: ['profile', 'email'] });

// TODO: add verification to all inputs
const handleSignIn = (req, res, next) => passport.authenticate('local',
(err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(400);

    req.logIn(user, err => {
        if (err) return next(err);

        return res.status(200).send({ fname: user.fname });
    });
})(req,res,next);


module.exports = {
    handleSignIn,
    redirectToGoogleAuth
};
