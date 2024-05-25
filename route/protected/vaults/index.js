const joi = require('joi');
const express = require('express');
const vaultsRouter = express.Router();
const { setupRouterBodyValidation } = require('@Route/expressRouterValidator');
const { addNewVault } = require('@Controller/protected/vaultManagement/addVault');
const { checkUserAuthentication } = require('@Middleware/custom/isSignedIn.middleware');

const routerSchemas = {
    '/': joi.object().keys({
        name: joi.string().required()
    })
}

vaultsRouter.use(checkUserAuthentication)
setupRouterBodyValidation(vaultsRouter, routerSchemas)

vaultsRouter.post('/', addNewVault)
// vaultsRouter.get('/', (req, res, next) => {} );
// vaultsRouter.post('/validate', (req, res, next) => {} );

module.exports = vaultsRouter;
