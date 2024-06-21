const joi = require('joi');
const express = require('express');
const signInRouter = express.Router();
const { redirectToGoogleAuth,
        redirectToGitHubAuth    
    } = require('@Controller/authentication/signin');
const { setupRouterBodyValidation } = require('@Route/config/expressRouterValidator');

const routerSchemas = {
    '/': joi.object().keys({
        phone: joi.string().required(),
        password: joi.string().required()
    }),
    '/google': {
        'GET': joi.object().keys({})
    },
    '/github': {
        'GET': joi.object().keys({})
    }
}

setupRouterBodyValidation(signInRouter, routerSchemas);

signInRouter.get('/google', redirectToGoogleAuth);
signInRouter.get('/github', redirectToGitHubAuth);

module.exports = signInRouter;
