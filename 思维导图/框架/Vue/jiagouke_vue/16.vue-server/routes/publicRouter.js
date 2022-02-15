let Router =require('@koa/router') ;
let publicController = require('../controller/publicController');

const router = new Router({prefix:'/public'});
router.get('/getSlider',publicController.getSlider);
router.get('/getCaptcha',publicController.getCaptcha);
module.exports = router;