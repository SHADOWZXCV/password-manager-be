const joi = require('joi');
const express = require('express');
const signInRouter = express.Router();
const { handleSignIn, 
        redirectToGoogleAuth    
    } = require('@Controller/authentication/signin');
const { setupRouterBodyValidation } = require('@Route/expressRouterValidator');

const routerSchemas = {
    '/': joi.object().keys({
        phone: joi.string().required(),
        password: joi.string().required()
    }),
}

setupRouterBodyValidation(signInRouter, routerSchemas);

signInRouter.post('/', handleSignIn);
// TODO: route for logout
signInRouter.get('/logout', (req, res, next) => {} );
// TODO: route for sms verification ( no sms, use verification code instead! )
signInRouter.post('/validate', (req, res, next) => {} );
signInRouter.get('/google', redirectToGoogleAuth);

module.exports = signInRouter;
