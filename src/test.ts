import captcha from './captcha';
import { writeFileSync } from 'fs';
import express from 'express';

const app = express();
const port = 3000;

console.time('Initiation time');
const captchaTest = new captcha();
console.timeEnd('Initiation time');

app.get('/', (_req, res) => {
    res.sendFile('temp.html', { root: `${__dirname}/../../`});
});

app.get('/captcha', async (_req, res) => {
    console.time('Captcha generation time');
    const captcha = await captchaTest.generate();
    console.timeEnd('Captcha generation time');
    res.send(captcha);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});