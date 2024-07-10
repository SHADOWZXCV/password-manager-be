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

    const promise = controller(request);

    // The controller must return a promise. 
    // If the controller returns nothing, send an error to express.
    if (!promise?.then) {
        logger.error("Controller must return a promise!");
        return next("Internal server error!");
    }

    promise
        .then(response => {
            if(!response)
            {
                logger.error(`Controller: ${controller.name} must return a response object`);
                return res.sendStatus(404);
            }
            
            const { status, data, error, useNext, actions } = response

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
