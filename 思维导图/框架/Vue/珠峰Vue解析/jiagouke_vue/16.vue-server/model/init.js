let Slider = require('./Slider');
let User = require('./User');
let Role = require('./Role');
let Auth = require('./Auth');

// 创建轮播图
// Slider.create([{
//     url:'http://www.javascriptpeixun.cn/files/system/2018/09-18/111926eb7fd8309596.png?version=8.3.6'
// },{
//     url:"http://www.javascriptpeixun.cn/files/system/2018/09-21/115355363dbc278291.png?version=8.3.6"
// },{
//     url:"http://www.javascriptpeixun.cn/files/system/2018/09-21/1154091603c0186386.png?version=8.3.6"
// }])


// 创建角色
// Role.create([{
//     roleName: '普通用户',
// },{
//     roleName: '管理员',
// }]);

// 创建权限
// Auth.create([
//     { pid: -1, name: '用户管理', id: 1, role: "5f3e2c3e1d8c73309876e089" },
//     { pid: 1, name: '用户权限', auth: 'userAuth', id: 2, role: "5f3e2c3e1d8c73309876e089", path: '/manager/userAuth', path: '/manager/userAuth' },
//     { pid: 1, name: '用户统计', auth: 'userStatistics', id: 3, role: "5f3e2c3e1d8c73309876e089", path: '/manager/userStatistics' },
//     { pid: -1, name: '信息发布', auth: 'infoPublish', id: 4, role: "5f3e2c3e1d8c73309876e089", path: '/manager/infoPublish' },
//     { pid: -1, name: '文章管理', auth: 'articleManager', id: 5, role: "5f3e2c3e1d8c73309876e089", path: '/manager/articleManager' },
//     { pid: -1, name: '个人中心', auth: 'personal', id: 6, role: "5f3e2c3e1d8c73309876e088", path: '/manager/personal' },
//     { pid: -1, name: '我的收藏', auth: 'myCollection', id: 7, role: "5f3e2c3e1d8c73309876e088", path: '/manager/myCollection' },
//     { pid: -1, name: '私信消息', auth: 'privateMessage', id: 8, role: "5f3e2c3e1d8c73309876e088", path: '/manager/privateMessage' },
//     { pid: -1, name: '我的文章', auth: 'myArticle', id: 9, role: "5f3e2c3e1d8c73309876e088", path: '/manager/myArticle' },
// ])

// 创建用户
// User.create([{
//         username: 'admin',
//         password: 'admin',
//         role: "5f3e2c3e1d8c73309876e089"
//     },
//     {
//         username: 'jw',
//         password: "jw",
//         role: "5f3e2c3e1d8c73309876e088"
//     }
// ]).then(res => {
//     console.log(res);
// })
// (async function() {
//     let {role} = await User.findOne({ username: 'admin', password: 'admin' }).populate('role');
//     Auth.find({ role: role._id }).then(data => {
//         console.log(data);
//     })
// })();