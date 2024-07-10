const crypto = require('crypto');
const ENC_KEY = process.env.AES_KEY;
const IV_LENGTH = 16;

const encrypt = (obj) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENC_KEY, 'hex'), iv);

    let encrypted = cipher.update(JSON.stringify(obj), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

const decrypt = (cipher) => {
    const textParts = cipher.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENC_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted.toString());
}

module.exports = {
    encrypt,
    decrypt
}
