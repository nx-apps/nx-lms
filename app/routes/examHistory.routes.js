module.exports = function(app){
    var examHistoryCtrl = require('../controllers/examHistory/examHistory.controller');
    //app.get('/examList',examHistoryCtrl.getExamList);
    //app.get('/historyList',examHistoryCtrl.getHistoryList);

    app.get('/examList',examHistoryCtrl.select_ExamList); //ข้อสอบที่ยังไม่ได้ทำ
    app.get('/test_exam',examHistoryCtrl.select_question);
    app.get('/historyList',examHistoryCtrl.getHistoryList); //่ข้อสอบที่ทำแล้ว

}