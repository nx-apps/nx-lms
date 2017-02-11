module.exports = function(app){
    var index = require('../controllers/question/index.controller');
    app.get('/question',index.select_question);
    app.get('/question_only',index.select_question_only);
    //app.get('/question_only/:id/',index.select_question_only);
    app.post('/question',index.insert_question);
    app.put('/question',index.update_question);
    app.delete('/question',index.delete_question);

    app.post('/upload',index.uploadFile);
}