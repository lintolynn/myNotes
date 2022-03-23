let mongoose = require('../config/dbConfig');
const SliderSchema = new mongoose.Schema({
    url: {
        type: String
    }
});
const SliderModal = mongoose.model('Slider', SliderSchema);
module.exports = SliderModal;