module.exports = function(app){
    var index = require('../controllers/tag/index.controller');
    app.get('/tag',index.select_tag);
    app.get('/tag',index.select_tag_only);
    app.post('/tag',index.insert_tag);
    app.put('/tag',index.update_tag);
    app.delete('/tag',index.delete_tag);
}