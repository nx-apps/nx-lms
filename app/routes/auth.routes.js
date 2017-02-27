module.exports = function (app) {
    var auth = require('../controllers/auth/auth.controller');
    app.post('/login', auth.login);
    app.post('/checkToken', auth.checkToken);
    app.post('/sha1', auth.sha1);
}