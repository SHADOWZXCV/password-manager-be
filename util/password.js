const argon2 = require('argon2');
const crypto = require('crypto');

const hash = async (password) => {
    const salt = crypto.randomBytes(16);
    const hashed = await argon2.hash(password, salt);

    return {
        hashed, salt
    };
}

const verify = async (password, originalPassword) => {
    return await argon2.verify(originalPassword, password)
}

module.exports = {
    hash,
    verify
};