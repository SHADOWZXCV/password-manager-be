const joi = require('joi');
const express = require('express');
const userAuthRouter = express.Router();
const { setupRouterBodyValidation } = require('@Route/expressRouterValidator');
const { checkUserAuthentication } = require('@Middleware/custom/isSignedIn.middleware');

const routerSchemas = {
    '/': {
        'GET': joi.object().keys({})
    }
}

setupRouterBodyValidation(userAuthRouter, routerSchemas)

userAuthRouter.get('/', checkUserAuthentication, (req, res, next) => {
    return res.status(200).send({
        user: {
            name: req.user.name,
            email: req.user.email,
            profile_pic: req.user.profile_pic
        }
    });
})

module.exports = userAuthRouter;
