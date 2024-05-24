const logger = require("@Util/log");

const expressControllerWrapper = (controller) => (req, res, next) => {
    const request = {
        requestData: req.body, 
        requestParams: req.params, 
        requestQuery: req.query,
        requestHeaders: req.headers,
        requestUser: req.user,
        requestFiles: req.file
    };

    // logger.debug(JSON.stringify(request.requestData));

    const promise = controller(request);

    // If the controller returns nothing, then it means go to the next middleware.
    if (!promise || !promise.then) {
        logger.error("Controller must return a promise!");
        return next("Internal server error!");
    }

    promise
        .then(({ status, data, error, useNext }) => {
            if(useNext)
                return next()

            return res.status(status).send(data || error)
        })
        .catch((error) => {
            logger.error(error.message);
            logger.error(error.stack);

            if (error)
                return res.status(500).send(error);

            return next(error);
        });
};

module.exports.expressControllerWrapper = expressControllerWrapper
