module.exports = function(app){
    var index = require('../controllers/user/index.controller');
    app.get('/user',index.select_user);
    app.post('/user',index.insert_user);
    app.put('/user',index.update_user);
    app.delete('/user',index.delete_user);
}