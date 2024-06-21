const passport = require('passport');

const redirectToGoogleAuth = passport.authenticate('google', {  scope: ['profile', 'email'] });
const redirectToGitHubAuth = passport.authenticate('github');

module.exports = {
    redirectToGoogleAuth,
    redirectToGitHubAuth
};
