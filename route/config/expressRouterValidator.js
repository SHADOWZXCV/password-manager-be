const { schemaAssigner, validator } = require('@Middleware/joi/routeDataValidator.middleware');
function setupRouterBodyValidation(expressRouter, routerSchemas) {
    expressRouter.use(schemaAssigner(routerSchemas), validator);
}

module.exports = {
    setupRouterBodyValidation
}
