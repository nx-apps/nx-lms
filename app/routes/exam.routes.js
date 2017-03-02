module.exports = function(app){
    
    var examCtrl = require('../controllers/exam/exam.controller');
    app.get('/time',examCtrl.getTime);
    app.get('/answer',examCtrl.get_answer); 
    app.get('/examList',examCtrl.getExamList); 

    app.get('/test_exam',examCtrl.select_question);
    app.get('/historyList',examCtrl.getHistoryList);
    app.get('/gen/:exid/:uid',examCtrl.generateTest);
    app.get('/exam',examCtrl.getExam);
    app.put('/exam',examCtrl.updateAnswer);
    app.post('/complete',examCtrl.complete);
}