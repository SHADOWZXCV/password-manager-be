require("dotenv").config()
require('module-alias/register')

const express = require("express")
const app = express()

const cors = require("cors")
const passport = require('passport')
const logger = require('@Util/log')

const { morganMiddleware,
        expressSession,
        rateLimiter } = require('@Middleware')
const { configPassport } = require('@Middleware/config')
const { corsOptions, checkState: checkCorsState } = require('@Config')

const registerRoutes = require('@Route')

checkCorsState(() => app.use(cors(corsOptions)))

// TODO: do session differentiation for user roles.
app.use(expressSession)

// Authentication Middlewares
app.use(passport.session())
app.use(passport.initialize())
configPassport(passport)

// Other Middlewares
app.use(rateLimiter)
app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

registerRoutes(app)

app.listen(process.env.PORT, () => 
    logger.info(`listening on port ${process.env.PORT}`)
)
