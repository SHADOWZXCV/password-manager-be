const joi = require('joi');
const express = require('express');
const vaultsRouter = express.Router();
const { setupRouterBodyValidation } = require('@Route/expressRouterValidator');
const { getVaults, getVaultById } = require('@Controller/protected/vaultManagement/getVault');
const { addNewVault } = require('@Controller/protected/vaultManagement/addVault');
const { checkUserAuthentication } = require('@Middleware/custom/isSignedIn.middleware');

const routerSchemas = {
    '/': {
        'POST': joi.object().keys({
            name: joi.string().required(),
            key: joi.string().required()
        }),
        'GET': joi.object().keys({})
    },
    '/vault': {
        'POST': joi.object().keys({
            vaultId: joi.string().required(),
            key: joi.string().required()
        })
    }
}

vaultsRouter.use(checkUserAuthentication)
setupRouterBodyValidation(vaultsRouter, routerSchemas)

vaultsRouter.post('/', addNewVault)
vaultsRouter.get('/', getVaults)
vaultsRouter.post('/vault', getVaultById)
// vaultsRouter.get('/', (req, res, next) => {} );
// vaultsRouter.post('/validate', (req, res, next) => {} );

module.exports = vaultsRouter;
