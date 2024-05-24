const mongoose = require('mongoose');
const logger = require('@Util/log');

class DB {
    constructor(){
        this._connect();
    }

    _connect(){
        mongoose.set('strictQuery', true)
        mongoose.connect(process.env.DBUri, (err) => err ? logger.fatal(err) : logger.info('db is conntected'));
    }

    getConnection(){
        return mongoose.connection;
    }
}

module.exports = new DB();
