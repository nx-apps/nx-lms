module.exports = function(app){
    var index = require('../controllers/test_exam/index.controller');
    app.get('/test_exam',index.select_exam);
}