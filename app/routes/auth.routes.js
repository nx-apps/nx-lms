module.exports = function(app){
    var auth = require('../controllers/auth/auth.controller');
    app.post('/login',auth.login);
}