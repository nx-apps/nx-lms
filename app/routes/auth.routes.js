const authenticate = require('../controllers/authenticate');
module.exports = function (app) {
    var auth = require('../controllers/auth/auth.controller');
    app.post('/login', auth.login);
    app.post('/checkToken',authenticate(), auth.checkToken);
    app.post('/sha1', auth.sha1);
}