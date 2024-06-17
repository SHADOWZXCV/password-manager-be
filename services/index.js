const { PrismaClient } = require('@prisma/client')
const logger = require('@Util/log');

class DB {
    constructor(){
        if(!DB._instance){
            DB._instance = new PrismaClient();
            logger.info('PrismaClient instance created');
        }

        return DB._instance
    }
}

module.exports = new DB();
