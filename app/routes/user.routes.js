const authenticate = require('../controllers/authenticate');
module.exports = function(app){
    var index = require('../controllers/user/index.controller');
    app.get('/user',authenticate(),index.select_user);
    app.get('/select_user',authenticate(),index.select_user_only);
    app.post('/user',authenticate(),index.insert_user);
    app.put('/user',authenticate(),index.update_user);
    app.delete('/user',authenticate(),index.delete_user);
}