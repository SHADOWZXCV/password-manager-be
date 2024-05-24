const { hash } = require('@Util/password');
const logger = require('@Util/log');

const handleSignup = (req, res) => {
    const { body } = req;
//    const numberVerification = randtoken.generate(6, "0123456789");

    hash(body.password, (data, salt) => {

    });
};

// TODO: change to number verification instead of email
const validateEmailUser = (req, res, next) => {
    const { body: { email, token }} = req;

    // validate token here
};


module.exports = {
    handleSignup,
    validateEmailUser
};
