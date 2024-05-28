const logger = require("@Util/log");
const { request } = require("express");

const expressControllerWrapper = (controller) => (req, res, next) => {
    const request = {
        requestData: req.body, 
        requestParams: req.params, 
        requestQuery: req.query,
        requestHeaders: req.headers,
        requestUser: req.user,
        requestFiles: req.file,
        requestSession: req.session
    };

    // logger.debug(JSON.stringify(request.requestData));

    const promise = controller(request);

    // If the controller returns nothing, then it means go to the next middleware.
    if (!promise || !promise.then) {
        logger.error("Controller must return a promise!");
        return next("Internal server error!");
    }

    promise
        .then(({ status, data, error, useNext, actions }) => {
            if(useNext)
                return next()

            if(actions)
                applyActions(req, res, actions)

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

const applyActions = (req, res, actions) => {
    const { sessionData } = actions

    if(!sessionData)
        return

    req.session.sessionData = {
        ...req.session.sessionData,
        ...sessionData
    }
}

module.exports.expressControllerWrapper = expressControllerWrapper
