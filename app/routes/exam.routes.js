module.exports = function(app){
    var examCtrl = require('../controllers/exam/exam.controller');
    app.get('/examList',examCtrl.select_ExamList); 
    app.get('/test_exam',examCtrl.select_question);
    app.get('/historyList',examCtrl.getHistoryList);

}