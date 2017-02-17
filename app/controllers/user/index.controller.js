sha1 = require('js-sha1');

class index{

    select_user(req,res){
        var r = req.r;
        var params = req.query;
        r.db('lms').table("user").getAll(params.tags,{index:'tags'}).merge(function(c){
            return{ 
                end_tags:c('end_tags').map(function(fc){ return r.db('lms').table('tag').get(fc)}),
                key_tags:c('key_tags').map(function(fc){ return r.db('lms').table('tag').get(fc)}) 
            }
        }).distinct()
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    select_user_only(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('user').get(params.id)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    insert_user(req,res){
        var r = req.r;
        var params = req.body;
        console.log(params+"x1");
        r.expr(params).merge(function(){
            return { password:sha1(params.password)}
        }).do(function(all){
            return r.db('lms').table('user').insert(all)
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    update_user(req,res){
        var r = req.r;
        var params = req.body;

        r.db('lms').table('user').get(params.id).update(params)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    delete_user(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('user').get(params.id).delete()
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

}

module.exports = new index();