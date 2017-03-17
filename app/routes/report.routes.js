
module.exports = function(app){
    var index = require('../controllers/report/index.controller');
    app.get('/report',index.report_onlyone);
}