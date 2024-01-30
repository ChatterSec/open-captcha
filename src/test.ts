import captcha from "./captcha";

const captchaInstance = new captcha();
const question = captchaInstance.generate();
console.log(question);