const logger = require('@Util/log');

module.exports = (req, sec) => {
    // TODO: improve this function and document it!
    logger.debug(`inside session func: session expiry ttl: ${sec}`);
    req.session.cookie.maxAge = Number(sec);
    req.session.save();

    return new Date().getTime() + Number(sec);
}
