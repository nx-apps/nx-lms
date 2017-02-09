module.exports = function(app){
    var index = require('../controllers/examination/index.controller');
    app.post('/examination_random',index.random_examination);
    app.get('/examination',index.select_examination);
    app.get('/examination_only',index.select_examination_only);
    app.get('/examination_tagall',index.select_tagall);
    app.post('/examination',index.insert_examination);
    app.put('/examination',index.update_examination);
    app.delete('/examination',index.delete_examination);
}