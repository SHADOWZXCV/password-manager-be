const logger = require('@Util/log');
const { error } = require('winston');

const validateOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};

const schemaAssigner = routerSchemas => (req, res, next) => {
    const schema = routerSchemas[req.path];
    req.bodyValidator = schema;

    if(!schema && req.method !== 'GET') {
        logger.error('No schema found for this route');

        return res.status(500).json({ error: 'Internal server error' });
    }

    next();
}

const validator = (req, res, next) => {
    const { error } = req.bodyValidator.validate(req.body, validateOptions);
    const customError = error ? {
        // error: error._original,
        details: error.details.map(({ message, type }) => ({
            message: message.replace(/['"]/g, ""),
            type
        }))
    } : null;

    if(error) return res.status(400).json(customError);

    next();
}

const fileValidator = (req, res, next) => {
    if(!req.file) return res.status(400).json({ error: 'No file found' });

    return next();
}

module.exports = {
    schemaAssigner,
    validator,
    fileValidator
}
