const authenticate = require('../controllers/authenticate');
module.exports=function(app){
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
        
    app.get('/examRoom',authenticate(),examRoom.select_ExamRoom);
    app.post('/examRoom',authenticate(),examRoom.insert_ExamRoom);
    app.get('/examRoom_only',authenticate(),examRoom.select_ExamRoom_only);
    app.put('/examRoom',authenticate(),examRoom.update_ExamRoom);
    app.delete('/examRoom',authenticate(),examRoom.delete_ExamRoom);

    app.get('/examRoom_module',authenticate(),examRoom.select_Module);
    app.get('/student',authenticate(),examRoom.select_student);
} 