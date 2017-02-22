const auth = require('../auth');

class common{
/*
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
        .map(function(row){
            return row.slice(1,row.count())
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
*/
    getModule(req,res){
            var r = req.r;
            var params = req.query; 

            auth.userInfo(req).then(user=>{


                //var tags = Array.from(new Set(user.end_tags.concat(user.key_tags)));

                r.branch(
                    r.expr(user.role).eq('admin'),
                    r.db('lms').table('tag').orderBy('id').pluck('id')('id'),
                    r.db('lms').table('tag').orderBy('id').pluck('id')('id')
                    .filter(function(row){
                        return r.expr(user.key_tags).contains(row)
                    })
                )
                .run()
                .then(function(result){
                    res.json(result);
                })
                .catch(function(err){
                    res.status(500).json(err);
                })

            }).catch(err=>{
                res.json(err);
            })
            
            
            
        }
}
module.exports = new common();