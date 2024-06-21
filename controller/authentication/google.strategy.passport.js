const googleStrategy = require('passport-google-oauth20').Strategy;
const createNewUserProviders = require('./createNewUserAccount');

module.exports = new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, createNewUserProviders);
