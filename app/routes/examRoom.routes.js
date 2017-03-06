const authenticate = require('../controllers/authenticate');
module.exports = function (app) {
    var examRoom = require('../controllers/examRoom/examRoom.controller');

    // app.get('/examList',examRoom.getExaminationList);
    // app.get('/learnerList',examRoom.getLearnerList);

    // app.get('/examRoomList',examRoom.getExamRoomList);
    // app.get('/examRoom',examRoom.selectExamRoom);
    // app.put('/examRoom',examRoom.updateExamRoom);
    // app.post('/examRoom',examRoom.insertExamRoom);
    // app.delete('/examRoom',examRoom.deleteExamRoom);

    // app.get('/userModuleList',examRoom.getUserModuleList);
    // app.get('/learnerTestList',examRoom.getLearnerTestList);

    app.get('/examRoom', authenticate(["key"]), examRoom.select_ExamRoom);
    app.post('/examRoom', authenticate(["key"]), examRoom.insert_ExamRoom);
    app.get('/examRoom_only', authenticate(["key"]), examRoom.select_ExamRoom_only);
    app.put('/examRoom', authenticate(["key"]), examRoom.update_ExamRoom);
    app.delete('/examRoom', authenticate(["key"]), examRoom.delete_ExamRoom);

    app.get('/examRoom_module', authenticate(["key"]), examRoom.select_Module);
    app.get('/student', authenticate(["key"]), examRoom.select_student);


    app.delete('/ejectExamTest', authenticate(["key"]), examRoom.ejectExamTest);
    app.delete('/retestExamTest', authenticate(["key"]), examRoom.retestExamTest);
} 
