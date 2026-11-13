// Decrypts the published index.html back into site.html for editing.  SEAL_PASSWORD=... node tools/unseal.js
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const root = path.join(__dirname, '..');
const pw = process.env.SEAL_PASSWORD;
if (!pw) { console.error('Set SEAL_PASSWORD'); process.exit(1); }
const gate = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const p = JSON.parse(gate.match(/const PAYLOAD = (\{.*?\});/s)[1]);
const key = crypto.pbkdf2Sync(pw, Buffer.from(p.salt, 'base64'), p.iter, 32, 'sha256');
const buf = Buffer.from(p.ct, 'base64');
const d = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(p.iv, 'base64'));
d.setAuthTag(buf.subarray(buf.length - 16));
const html = Buffer.concat([d.update(buf.subarray(0, buf.length - 16)), d.final()]).toString('utf8');
fs.writeFileSync(path.join(root, 'site.html'), html);
console.log('site.html written');
