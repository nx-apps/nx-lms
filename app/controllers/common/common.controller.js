
class common{

    getModule(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('question')
        .filter({user_id:params.user_id})('tag')
        .concatMap(function(row){
            return row
        }).distinct()
        .filter(function(row){
            return row.slice(0,1).eq('*')
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
        
    }


    getSubModule(req,res){
        var r = req.r;
        var params = req.query;
        //res.json(params.module);
        r.db('lms').table('question').getAll(params.module,{index:'tag'})
        .filter({user_id:params.user_id})('tag')
        .concatMap(function(row){
            return row
        }).distinct()
        .filter(function(row){
            return row.slice(0,1).ne('*')
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
        
    }

}

module.exports = new common();