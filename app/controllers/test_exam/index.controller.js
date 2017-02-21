const auth = require('../auth');
class index{

    select_exam(req,res){
        var r = req.r;
        var params = req.query;

        auth.userInfo(req).then(user=>{
            res.json(user);
        }).catch(err=>{
            res.json(err);
        })

        
    }
}

module.exports = new index();