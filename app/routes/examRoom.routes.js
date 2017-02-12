module.exports=function(app){
    var examRoom = require('../controllers/examRoom/examRoom.controller');
    app.get('/examList',examRoom.getExaminationList);
    app.get('/learnerList',examRoom.getLearnerList);

    app.get('/examRoomList',examRoom.getExamRoomList);
    app.get('/examRoom',examRoom.selectExamRoom);
    app.post('/examRoom',examRoom.insertExamRoom);
    app.delete('/examRoom',examRoom.deleteExamRoom);
    
} 