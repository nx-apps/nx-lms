module.exports = function(app){
    var auth = require('../controllers/auth/auth.controller');
    app.post('/login',auth.login);
    app.post('/checkToken',auth.checkToken);
}