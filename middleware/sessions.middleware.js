const expressSession = require('express-session')
const { sessionOptions } = require('@Config')

module.exports = {
    expressSession: expressSession(sessionOptions)
}