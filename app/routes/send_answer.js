module.exports = function(app){
    var index = require('../controllers/send_answer/index.controller');
    app.post('/send_answer',index.send_answer);
}