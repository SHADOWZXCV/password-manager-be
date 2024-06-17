const joi = require('joi');
const express = require('express');
const vaultsRouter = express.Router();
const { setupRouterBodyValidation } = require('@Route/expressRouterValidator');
const { getVaults, getVaultById, openVault } = require('@Controller/protected/vaultManagement/getVault');
const { addNewVault } = require('@Controller/protected/vaultManagement/addVault');
const { checkUserAuthentication } = require('@Middleware/custom/isSignedIn.middleware');
const { checkIfVaultIsOpen } = require('@Middleware/custom/authorizeVault.middleware');

const routerSchemas = {
    '/': {
        'POST': joi.object().keys({
            name: joi.string().required(),
            key: joi.string().required()
        }),
        'GET': joi.object().keys({})
    },
    '/openVault': {
        'POST': joi.object().keys({
            vaultId: joi.string().required(),
            key: joi.string().required()
        })
    },
    '/vault': {
        // NOTE: I have removed key verification, 
        // since I've already added the opened vault id to the request session! 
        'GET': joi.object().keys({
            vaultId: joi.string().required()
        })
    }
}

vaultsRouter.use(checkUserAuthentication)
setupRouterBodyValidation(vaultsRouter, routerSchemas)

vaultsRouter.get('/', getVaults)
vaultsRouter.get('/vault', checkIfVaultIsOpen, getVaultById)
vaultsRouter.post('/', addNewVault)
vaultsRouter.post('/openVault', openVault)
vaultsRouter.post('/vault', getVaultById)

module.exports = vaultsRouter;
