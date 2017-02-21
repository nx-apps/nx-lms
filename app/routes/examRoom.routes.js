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
        
    app.get('/examRoom',examRoom.select_ExamRoom);
    app.post('/examRoom',examRoom.insert_ExamRoom);
    app.get('/examRoom_only',examRoom.select_ExamRoom_only);
    app.put('/examRoom',examRoom.update_ExamRoom);
    app.delete('/examRoom',examRoom.delete_ExamRoom);

    app.get('/examRoom_module',examRoom.select_Module);
    app.get('/student',examRoom.select_student);
} 