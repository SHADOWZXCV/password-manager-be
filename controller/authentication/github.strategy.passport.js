const GitHubStrategy = require('passport-github').Strategy;
const createNewUserProviders = require('./createNewUserAccount');

module.exports = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: 'user:email'
}, createNewUserProviders);
