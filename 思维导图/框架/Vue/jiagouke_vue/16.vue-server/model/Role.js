let mongoose = require('../config/dbConfig');

// 权限
const RoleSchema = new mongoose.Schema({
    roleName:{
        type:String
    }
});
const SliderModal = mongoose.model('Role', RoleSchema);

module.exports = SliderModal;