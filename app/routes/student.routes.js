module.exports = function(app){
    var index = require('../controllers/student/index.controller');
    app.get('/student',index.select_student);
    app.post('/student',index.insert_student);
    app.put('/student',index.update_student);
    app.delete('/student',index.delete_student);
}