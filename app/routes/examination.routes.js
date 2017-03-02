const authenticate = require('../controllers/authenticate');
module.exports = function(app){
    var index = require('../controllers/examination/index.controller');
    app.post('/examination_random',authenticate(),index.random_examination);
    app.get('/examination',authenticate(),index.select_examination);
    app.get('/examination_only',authenticate(),index.select_examination_only);
    app.post('/examination',authenticate(),index.insert_examination);
    app.put('/examination',authenticate(),index.update_examination);
    app.delete('/examination',authenticate(),index.delete_examination);
}