const joi = require('joi');
const express = require('express');
const vaultsEntriesRouter = express.Router();
const { setupRouterBodyValidation } = require('@Route/expressRouterValidator');
const { getVaultEntryDetails } = require('@Controller/protected/vaultContent/getEntry');
const { addNewVaultEntry } = require('@Controller/protected/vaultContent/addEntry');
const { checkUserAuthentication } = require('@Middleware/custom/isSignedIn.middleware');
const { checkIfVaultIsOpen } = require('@Middleware/custom/authorizeVault.middleware');

const routerSchemas = {
    '/': {
        'POST': joi.object().keys({
            name: joi.string().required(),
            vaultId: joi.string().required(),
            value: joi.string().required()
        }),
        'GET': joi.object().keys({
            vaultId: joi.string().required()
        })
    }
}

vaultsEntriesRouter.use(checkUserAuthentication)
vaultsEntriesRouter.use(checkIfVaultIsOpen)
setupRouterBodyValidation(vaultsEntriesRouter, routerSchemas)

vaultsEntriesRouter.get('/', getVaultEntryDetails)
vaultsEntriesRouter.post('/', addNewVaultEntry)
// vaultsRouter.get('/', (req, res, next) => {} );
// vaultsRouter.post('/validate', (req, res, next) => {} );

module.exports = vaultsEntriesRouter;
