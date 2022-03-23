let Router = require('@koa/router');
let userController = require('../controller/userController')
const router = new Router({
    prefix: '/user'
});
router.post('/login', userController.login);
router.post('/reg', userController.reg);
router.get('/validate', userController.validate)
router.get('/sendEmail', userController.sendEmail);
router.post('/codeValidate',userController.codeValidate);
router.post('/changePassword',userController.changePassword)
module.exports = router;