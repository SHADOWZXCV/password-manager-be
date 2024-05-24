const googleStrategy = require('passport-google-oauth20').Strategy;


module.exports = new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    const { email } = profile;
    const user = await userModel.findOne({ email });

    // TODO: convert google profile to user and save to db
    // if not exist!
    // if(!user) {
    //     await userModel.save()
    // }
    // const newUser = {
        
    // }

    console.log(profile);

    // return new user instead of profile
    return done(null, profile);
})
