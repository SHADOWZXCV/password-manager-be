const ResponseEntity = require('@Entities/Response');
const logger = require('@Util/log');

const mongooseErrorsMap = {
    "11000": (keyName) => {
        return {
            status: 409,
            error: {
                error: `Duplicate key: ${keyName}`
            }
        }
    }
}

function generateErrorResponse(err) {
    const validationError = validationErrorHandler(err)
    const generatedResponse = validationError || {
        status: 400,
        error: {
            error: err.message || err
        }
    }

    if(!validationError && err.stack)
        logger.error(`${err.message} ${err.stack}`)

    return new ResponseEntity(generatedResponse)
}

function validationErrorHandler(err) {
    const { code, keyPattern } = err
    const duplicateKey = keyPattern && Object.keys(keyPattern)[0]
    const responseGenerator = mongooseErrorsMap[code]
    
    if(!responseGenerator)
        return null

    return responseGenerator(duplicateKey)
}

module.exports = generateErrorResponse