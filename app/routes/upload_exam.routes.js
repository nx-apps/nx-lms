module.exports = function(app){
    var index = require('../controllers/upload_exam/index.controller');
    app.post('/upload_exam',index.upload_exam);
}