const authenticate = require('../controllers/authenticate');
module.exports = function(app){
    var index = require('../controllers/upload_exam/index.controller');
    app.post('/upload_exam',authenticate(),index.upload_exam);
}