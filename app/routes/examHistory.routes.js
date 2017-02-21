module.exports = function(app){
    var examHistoryCtrl = require('../controllers/examHistory/examHistory.controller');
    //app.get('/examList',examHistoryCtrl.getExamList);
    //app.get('/historyList',examHistoryCtrl.getHistoryList);

    app.get('/examList',examHistoryCtrl.select_ExamList);
    app.get('/test_exam',examHistoryCtrl.select_question);
    app.get('/historyList',examHistoryCtrl.getHistoryList);
    app.get('/student',examHistoryCtrl.select_student);
}