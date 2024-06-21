const joi = require('joi');
const express = require('express');
const vaultsEntriesRouter = express.Router();
const { setupRouterBodyValidation } = require('@Route/config/expressRouterValidator');
const { getVaultEntryDetails } = require('@Controller/protected/vaultContent/getEntry');
const { addNewVaultEntry } = require('@Controller/protected/vaultContent/addEntry');
const { updateVaultEntry } = require('@Controller/protected/vaultContent/updateEntry');
const { deleteVaultEntry } = require('@Controller/protected/vaultContent/deleteEntry');
const { checkUserAuthentication } = require('@Middleware/custom/isSignedIn.middleware');
const { checkIfVaultIsOpen } = require('@Middleware/custom/authorizeVault.middleware');

const routerSchemas = {
    '/': {
        'GET': joi.object().keys({
            vaultId: joi.string().required(),
            entryId: joi.string().required()
        }),
        'POST': joi.object().keys({
            name: joi.string().required(),
            vaultId: joi.string().required(),
            value: joi.string().required()
        }),
        'PUT': joi.object().keys({
            name: joi.string().optional(),
            vaultId: joi.string().required(),
            entryId: joi.string().required(),
            value: joi.string().optional()
        }),
        'DELETE': joi.object().keys({
            vaultId: joi.string().required(),
            entryId: joi.string().required()
        }),
    }
}

vaultsEntriesRouter.use(checkUserAuthentication)
setupRouterBodyValidation(vaultsEntriesRouter, routerSchemas)
vaultsEntriesRouter.use(checkIfVaultIsOpen)

vaultsEntriesRouter.get('/', getVaultEntryDetails)
vaultsEntriesRouter.post('/', addNewVaultEntry)
vaultsEntriesRouter.patch('/', updateVaultEntry)
vaultsEntriesRouter.delete('/', deleteVaultEntry)
// vaultsRouter.get('/', (req, res, next) => {} );
// vaultsRouter.post('/validate', (req, res, next) => {} );

module.exports = vaultsEntriesRouter;
