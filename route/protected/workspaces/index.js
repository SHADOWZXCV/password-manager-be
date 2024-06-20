const joi = require('joi');
const express = require('express');
const workspacesRouter = express.Router();
const { setupRouterBodyValidation } = require('@Route/expressRouterValidator');
const { checkUserAuthentication } = require('@Middleware/custom/isSignedIn.middleware');
const { addWorkspace } = require('@Controller/protected/workspaceManagement/addWorkspace');

const routerSchemas = {
    '/workspace': {
        'POST': joi.object().keys({
            name: joi.string().required(),
            description: joi.string().optional(),
            iconName: joi.string().optional(),
            vaultsIds: joi.array().items(joi.string()).max(2).optional(),
            userIds: joi.array().items(joi.string()).max(2).optional()
        })
    }
}

// TODO: Add invitation routes for users.
workspacesRouter.use(checkUserAuthentication)
setupRouterBodyValidation(workspacesRouter, routerSchemas)

workspacesRouter.post('/workspace', addWorkspace)

module.exports = workspacesRouter;
