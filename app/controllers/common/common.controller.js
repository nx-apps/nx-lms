//const auth = require('../auth');

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

            console.log(params.getall);
            if(params.getall=="true"){
                params.getall = true;
            }else{
                params.getall = false;
            }
            console.log(params.getall);
           // auth.userInfo(req).then(user=>{

                var user=req.user;
                //var tags = Array.from(new Set(user.end_tags.concat(user.key_tags)));

                r.branch(
                    r.expr(user.role).eq('admin').or(r.expr(user.key_tags).contains('*')),
                    r.db('lms').table('tag').orderBy('id').pluck('id')('id').do(function(result){
                        return r.branch(r.expr(params.getall).eq(true),
                            result
                        ,
                            result.filter(function(row){
                                return row.ne('*')
                            })
                        );
                    })
                    
                    ,
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

          //  }).catch(err=>{
            //    res.json(err);
          //  })
            
            
            
        }
}
module.exports = new common();