const logger = require('@Util/log')
const { findUserById } = require('@Services/user')
const { signupLocalStrategy, localStrategy } = require('@Controller/authentication/localStrategy.passport')
const googleStrategy = require('@Controller/authentication/google.strategy.passport')
const githubStrategy = require('@Controller/authentication/github.strategy.passport')

function configPassport(passport) {
    passport.use('local', localStrategy)
    passport.use('signup-local', signupLocalStrategy)
    passport.use(googleStrategy)
    passport.use(githubStrategy)

    passport.serializeUser((user, done) => {
        logger.debug(`account is serializing..`)

        const reqAttachedUser = { id: user.id, email: user.email }

        return done(null, reqAttachedUser);
    })

    passport.deserializeUser((user, done) => {
        logger.debug('account is deserializing..'); 
        
        findUserById(user.id)
        .then(user => {
            done(null, user);
        }).catch(err => {
            done(err, null);
        })
    })
}

module.exports = configPassport
