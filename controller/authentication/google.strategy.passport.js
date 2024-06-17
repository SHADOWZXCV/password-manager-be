const googleStrategy = require('passport-google-oauth20').Strategy;
const { createUser, findUserByEmail } = require('@Services/user');

module.exports = new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    const { _json: { email } } = profile;
    let user = await findUserByEmail(email);

    if(!user) {
        const newUser = {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: profile.provider,
            profile_pic: profile.photos[0].value
        }

        user = await createUser(newUser);
    }

    return done(null, user);
})
