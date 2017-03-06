const authenticate = require('../controllers/authenticate');
module.exports = function(app){
    var common = require('../controllers/common/common.controller');
    app.get('/module',authenticate(),common.getModule);
    app.get('/module2',common.getModule2);
    //app.get('/subModule',common.getSubModule);
}