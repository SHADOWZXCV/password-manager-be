const logger = require('@Util/log');

const validateOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};

const schemaAssigner = routerSchemas => (req, res, next) => {
    if(!routerSchemas[req.path]) {
        logger.error('Non defined route');

        return res.status(500).json({ error: 'Internal server error' });
    }

    const schema = routerSchemas[req.path][req.method];
    req.bodyValidator = schema;

    if(!schema) {
        logger.error('No schema found for this route');

        return res.status(500).json({ error: 'Internal server error' });
    }

    next();
}

const validator = (req, res, next) => {
    const data = req.method === 'GET' ? req.query : req.body;
    const { error } = req.bodyValidator.validate(data, validateOptions);
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
