let Slider = require('../model/Slider');
let { setValue, getValue } = require('../config/redisConfig');
let svgCaptcha = require('svg-captcha');
class PublicController {
    async getSlider(ctx) {
        let sliders = await Slider.find({});
        ctx.body = {
            err: 0,
            data: sliders
        }
    }
    async getCaptcha(ctx) {
        const query = ctx.query;
        const newCaptcha = svgCaptcha.create({
            size: 4,
            width: 150,
            height: 38,
            noise: Math.floor(Math.random() * 5),
            ignoreChars:'1il0o'
        });
        setValue(query.uid, newCaptcha.text, 10 * 60);
        ctx.body = {
            err: 0,
            data: newCaptcha.data,
        }
    }
}
module.exports = new PublicController;