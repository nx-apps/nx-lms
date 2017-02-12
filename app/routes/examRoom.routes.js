module.exports=function(app){
    var examRoom = require('../controllers/examRoom/examRoom.controller');
    app.get('/examList/:user_id',examRoom.getExaminationList);
    
} 