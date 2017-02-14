module.exports = function(app){
    var index = require('../controllers/send_answer/index.controller');
    app.post('/student',index.send_answer);
}