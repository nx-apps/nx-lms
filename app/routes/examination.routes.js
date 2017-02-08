module.exports = function(app){
    var index = require('../controllers/examination/index.controller');
    app.post('/examination_random',index.random_question);
    app.get('/examination',index.select_examination);
    // app.get('/question_only',index.select_question_only);
    // app.post('/question',index.insert_question);
    // app.put('/question',index.update_question);
    // app.delete('/question',index.delete_question);
}