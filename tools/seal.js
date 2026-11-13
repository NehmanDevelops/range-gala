// Password-protects the site: encrypts site.html (the readable source, never committed) into index.html.
//   SEAL_PASSWORD=... node tools/seal.js
// The published index.html holds only AES-256-GCM ciphertext (key from PBKDF2-SHA256, 310k rounds),
// so the content cannot be read from GitHub or "view source" without the password.
// To edit: SEAL_PASSWORD=... node tools/unseal.js  -> writes site.html, edit it, then seal again.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const root = path.join(__dirname, '..');
const pw = process.env.SEAL_PASSWORD;
if (!pw) { console.error('Set SEAL_PASSWORD'); process.exit(1); }
const html = fs.readFileSync(path.join(root, 'site.html'), 'utf8');
const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12), iter = 310000;
const key = crypto.pbkdf2Sync(pw, salt, iter, 32, 'sha256');
const c = crypto.createCipheriv('aes-256-gcm', key, iv);
const ct = Buffer.concat([c.update(html, 'utf8'), c.final(), c.getAuthTag()]);
const payload = { v: 1, iter, salt: salt.toString('base64'), iv: iv.toString('base64'), ct: ct.toString('base64') };
const gate = fs.readFileSync(path.join(__dirname, 'gate.html'), 'utf8').replace('__PAYLOAD__', JSON.stringify(payload));
fs.writeFileSync(path.join(root, 'index.html'), gate);
console.log('index.html sealed (' + Math.round(gate.length / 1024) + ' KB)');
