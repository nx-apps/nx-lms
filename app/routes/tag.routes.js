const authenticate = require('../controllers/authenticate');
module.exports = function(app){
    var index = require('../controllers/tag/index.controller');
    app.get('/tag',authenticate(),index.select_tag);
    app.get('/tag',authenticate(),index.select_tag_only);
    app.post('/tag',authenticate(),index.insert_tag);
    app.put('/tag',authenticate(),index.update_tag);
    app.delete('/tag',authenticate(),index.delete_tag);
}