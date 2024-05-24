const express = require('express');
const signupRouter = express.Router();
const {
    handleSignup,
} = require('@Controller/authentication/signup');
const { setupRouterBodyValidation } = require('@Route/expressRouterValidator');

const routerSchemas = {
    // '/': joi.object().keys({
    //     phone: joi.string().required(),
    //     password: joi.string().required()
    // }),
}

setupRouterBodyValidation(signupRouter, routerSchemas);


signupRouter.post('/', handleSignup);
module.exports = signupRouter;
