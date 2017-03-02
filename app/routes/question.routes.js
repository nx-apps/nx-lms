const authenticate = require('../controllers/authenticate');
module.exports = function(app){
    var index = require('../controllers/question/index.controller');
    app.get('/question',authenticate(),index.select_question);
    app.get('/question_only',authenticate(),index.select_question_only);
    app.get('/sub_module',authenticate(),index.select_sub);
    app.post('/question',authenticate(),index.insert_question);
    app.put('/question',authenticate(),index.update_question);
    app.delete('/question',authenticate(),index.delete_question);

    app.post('/upload',authenticate(),index.uploadFile);
    app.get('/report_question',authenticate(),index.report_question);
}