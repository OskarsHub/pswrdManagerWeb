const crypto = require('crypto');
const algorithm = process.env.ALGORITHM;
const key = process.env.KEY;

const encrypt = (password) => {

    const iv = crypto.randomBytes(16);

    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

const decrypt = (password, ivToBuffer) => {

    let iv = Buffer.from(ivToBuffer, 'hex');
    let encryptedText = Buffer.from(password, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = { encrypt, decrypt };