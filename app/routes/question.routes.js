module.exports = function(app){
    var index = require('../controllers/question/index.controller');
    app.get('/question',index.select_question);
    app.post('/question',index.insert_question);
}