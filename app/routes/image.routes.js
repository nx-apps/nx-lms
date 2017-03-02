const authenticate = require('../controllers/authenticate');
module.exports=function(app){
    var imageCtrl = require('../controllers/image/image.controller');
    app.post('/image',authenticate(),imageCtrl.uploadImage); 
    app.get('/image/:id',imageCtrl.downloadImage); 
    // app.delete('/file/:id',imageCtrl.deleteFile); 
    // app.get('/list',imageCtrl.listFile); 
    // app.get('/list/:refPath',imageCtrl.listFilePath); 
    
} 