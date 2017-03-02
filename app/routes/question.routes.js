const authenticate = require('../controllers/authenticate');
module.exports = function(app){
    var index = require('../controllers/question/index.controller');
    app.get('/question',authenticate(["key"]),index.select_question);
    app.get('/question_only',authenticate(["key"]),index.select_question_only);
    app.get('/sub_module',authenticate(["key"]),index.select_sub);
    app.post('/question',authenticate(["key"]),index.insert_question);
    app.put('/question',authenticate(["key"]),index.update_question);
    app.delete('/question',authenticate(["key"]),index.delete_question);

    app.post('/upload',authenticate(["key"]),index.uploadFile);
     app.post('/confirm',authenticate(["key"]),index.confirm);
    app.get('/report_question',authenticate(["key"]),index.report_question);
}