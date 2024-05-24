const googleStrategy = require('@Controller/authentication/google.strategy.passport')
const { signupLocalStrategy, localStrategy } = require('@Controller/authentication/localStrategy.passport')
const logger = require('@Util/log')

function configPassport(passport) {
    passport.use('local', localStrategy)
    passport.use('signup-local', signupLocalStrategy)
    passport.use(googleStrategy)

    passport.serializeUser((user, done) => {
        logger.debug(`${modelType} account is serializing..`)

        const reqAttachedUser = { id: user.id }

        return done(null, reqAttachedUser);
    })

    passport.deserializeUser((data, done) => {
        logger.debug('parent account is deserializing..'); 
        userModel.findById(id, function(err, user) {
            done(err, user);
        });
    });
}

module.exports = configPassport
