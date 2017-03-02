const authenticate = require('../controllers/authenticate');
module.exports=function(app){
    var index=require('../controllers/notify/index.controller');
    app.get('/report/',authenticate(),index.getNotify);
    app.get('/path',authenticate(),index.getPath);

    var notify2IndexCtrl = require('../controllers/notify/notify2.controller');
    app.get('/noti',authenticate(),notify2IndexCtrl.selectnotify);
    app.get('/notiall',authenticate(),notify2IndexCtrl.selectnotifyAll); 
    app.put('/noti',authenticate(),notify2IndexCtrl.saveOrdinal); 
} 