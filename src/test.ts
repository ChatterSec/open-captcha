import captcha from './captcha';
import { writeFileSync } from 'fs';
import express from 'express';

const app = express();
const port = 8008;

console.time('Initiation time');
const captchaTest = new captcha();
console.timeEnd('Initiation time');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
    res.sendFile('temp.html', { root: `${__dirname}/../../`});
});

app.post('/test', (req, res) => {
    const token = req.body['open-captcha'];
    console.log(captchaTest.validateToken(token))
    res.redirect('/');
});

app.get('/captcha', async (_req, res) => {
    console.time('Captcha generation time');
    const captcha = await captchaTest.generate();
    console.timeEnd('Captcha generation time');
    res.send(captcha);
});

app.post('/captcha', async (req, res) => {
    const data = req.body;
    const isValid = await captchaTest.validate(data.selected, data.anwser);
    console.log(isValid)
    return res.send(isValid);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});