const crypto = require('crypto');

const algorithm = process.env.algorithm;
const secretKey = process.env.key;

const encrypt = async (text) => {
    const cipher = crypto.createCipher('aes-256-cbc', Buffer.from(secretKey));
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

const decrypt = async (encrypted) => {
    const decipher = crypto.createDecipher(algorithm, secretKey);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt };


