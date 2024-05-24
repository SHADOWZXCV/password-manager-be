const MongoStore = require('connect-mongo')
const logger = require("@Util/log")

const { getConnection } = require('@Models')

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
    store: MongoStore.create({
        client: getConnection().getClient(),
        dbName: process.env.dbName,
        collectionName: "sessions",
        // For some reason all below is
        // not useful in any shape or form
        // what I found is that the max age already does all the work!
        // autoRemove: 'interval',
        // autoRemoveInterval: 1
        // ttl: 1
    }),
    // cookie: {
        //   maxAge: 1000 * 6,
        //   sameSite: true,
        // }
}

const checkState = () => {
    if(!process.env.origin){
        logger.error('Cors origin is not specified!');
    }
};

module.exports = {
    sessionOptions,
    corsOptions,
    checkState
};
