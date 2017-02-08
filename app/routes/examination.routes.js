module.exports = function(app){
    var index = require('../controllers/examination/index.controller');
    app.post('/examination_random',index.random_examination);
    app.get('/examination',index.select_examination);
    app.get('/examination_only',index.select_examination_only);
}