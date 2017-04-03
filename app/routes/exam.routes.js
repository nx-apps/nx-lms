const authenticate = require('../controllers/authenticate');
module.exports = function(app){

    var examCtrl = require('../controllers/exam/exam.controller');
    app.get('/time',authenticate(),examCtrl.getTime);
    app.get('/answer',authenticate(),examCtrl.get_answer); 
    app.get('/examList',authenticate(),examCtrl.getExamList); 

    app.get('/test_exam',authenticate(),examCtrl.select_question);
    app.get('/historyList',authenticate(),examCtrl.getHistoryList);
  //  app.get('/gen/:exid/:uid',authenticate(["key"]),examCtrl.generateTest);
    app.get('/exam',authenticate(),examCtrl.getExam);
    app.put('/exam',authenticate(),examCtrl.updateAnswer);
    app.post('/complete',authenticate(),examCtrl.complete);

    app.get('/sendEmailRetest',authenticate(),examCtrl.send_email_retest);
}