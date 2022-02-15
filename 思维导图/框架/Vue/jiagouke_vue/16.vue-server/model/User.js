let mongoose = require('../config/dbConfig');
let Role  = require('./Role');
let Auth = require('./Auth');
const UserSchema = new mongoose.Schema({
    username: { // 用户名
        type: String,
        required: true
    },
    password: { // 密码 
        type: String,
        required: true
    },
    name: { // 昵称
        type: String,
        default: ''
    },
    created: { // 注册账号时间
        type: Date,
        default: Date.now
    },
    updated: { // 文章最后更新时间
        type: Date,
        default: Date.now
    },
    gender: { // 性别
        type: Number,
        default: -1
    },
    role: { // 角色
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',// 0 普通用户 // 1 管理员
        default:'5f3e2c3e1d8c73309876e088'
    },
    avatar: { // 头像
        type: String,
        default: ''
    },
    status: { // 状态
        type: String,
        default: 0
    }
});
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;