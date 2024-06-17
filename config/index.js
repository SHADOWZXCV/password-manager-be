const expressSession = require('express-session')
const connectPgSimple = require("connect-pg-simple")
const logger = require("@Util/log")

const Store = connectPgSimple(expressSession)

const corsOptions = {
    origin: process.env.origin,
    credentials: true,
    optionSuccessStatus: 200
};

const sessionOptions = {
    secret: process.env.SS,
    name: process.env.secretSessionName,
    sameSite: true,
    resave: false,
    saveUninitialized: false,
    store: new Store({
        ttl: process.env.sessionTTL
    })
    // cookie: {
        //   maxAge: 1000 * 6,
        //   sameSite: true,
        // }
}

const checkState = (cb) => {
    if(!process.env.origin){
        return logger.error('Cors origin is not specified!');
    }

    cb();
};

module.exports = {
    sessionOptions,
    corsOptions,
    checkState
};
