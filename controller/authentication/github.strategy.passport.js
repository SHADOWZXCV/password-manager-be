const GitHubStrategy = require('passport-github').Strategy;
const PrismaClient = require('@Models');
const logger = require('@Util/log');

module.exports = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    const { profileUrl } = profile;
    let user = await PrismaClient.user.findUnique({ where: { email: profileUrl } });

    if(!user) {
        const newUser = {
            id: profile.id,
            name: profile.displayName,
            email: profile.profileUrl,
            provider: profile.provider,
            profile_pic: profile.photos[0].value
        }

        user = await PrismaClient.user.create({ data: newUser });
    }

    return done(null, user);
})