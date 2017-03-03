const authenticate = require('../controllers/authenticate');
module.exports = function(app){
    var index = require('../controllers/examination/index.controller');
    app.post('/examination_random',authenticate(["key"]),index.random_examination);
    app.get('/examination',authenticate(["key"]),index.select_examination);
    app.get('/examination_only',authenticate(["key"]),index.select_examination_only);
    app.post('/examination',authenticate(["key"]),index.insert_examination);
    app.put('/examination',authenticate(["key"]),index.update_examination);
    app.delete('/examination',authenticate(["key"]),index.delete_examination);
    app.post('/print',authenticate(["key"]),index.print);
}