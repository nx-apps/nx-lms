const authenticate = require('../controllers/authenticate');
module.exports = function (app) {
    var index = require('../controllers/user/index.controller');
    app.get('/user', authenticate(["admin"]), index.select_user);
    app.get('/select_user', authenticate(["admin"]), index.select_user_only);
    app.post('/user', authenticate(["admin"]), index.insert_user);

    app.put('/user', authenticate(), index.update_user);
    app.delete('/user', authenticate(["admin"]), index.delete_user);
    app.get('/current', authenticate(), index.current_user);
    app.post('/register', index.register_user);
    app.get('/forget', index.forgetPassword);
    app.get('/verify', index.verify);
    app.get('/reset', index.reset);

}