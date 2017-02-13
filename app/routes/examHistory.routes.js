module.exports = function(app){
    var examHistoryCtrl = require('../controllers/examHistory/examHistory.controller');
    app.get('/examList',examHistoryCtrl.getExamList);
    app.get('/historyList',examHistoryCtrl.getHistoryList);
}