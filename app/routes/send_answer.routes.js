const authenticate = require('../controllers/authenticate');
module.exports = function(app){
    var index = require('../controllers/send_answer/index.controller');
    app.post('/send_answer',authenticate(),index.send_answer);
    app.get('/show_answer',authenticate(),index.show_answer);
}