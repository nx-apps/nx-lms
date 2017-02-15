module.exports=function(app){
    var examRoom = require('../controllers/examRoom/examRoom.controller');
    app.get('/examList',examRoom.getExaminationList);
    app.get('/learnerList',examRoom.getLearnerList);

    app.get('/examRoomList',examRoom.getExamRoomList);
    app.get('/examRoom',examRoom.selectExamRoom);
    app.put('/examRoom',examRoom.updateExamRoom);
    app.post('/examRoom',examRoom.insertExamRoom);
    app.delete('/examRoom',examRoom.deleteExamRoom);

    app.get('/userModuleList',examRoom.getUserModuleList);
    app.get('/learnerTestList',examRoom.getLearnerTestList);
    
} 