class index{
    select_examination(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('examination').getAll(params.module, {index:'module'}).orderBy('time_insert')
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    select_examination_only(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('examination').get(params.id)
        /*.merge(function(x){
            return {
                question:x('question').merge(function(q){
                    return r.db('lms').table('question').get(q('question_id'))
                })
            }
        })*/
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    insert_examination(req,res){
        var r = req.r;
        var params = req.body;

        r.expr(params).merge(function(){
            return { time_insert:r.now() }
        }).do(function(result){
            return r.db('lms').table('examination').insert(result)
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    update_examination(req,res){
        var r = req.r;
        var params = req.body;

        r.db('lms').table('examination').get(params.id).update(params)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    delete_examination(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('examination').get(params.id).delete()
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    random_examination(req,res){
        var r = req.r;
        var params = req.body;
        
        r.expr(params).concatMap(function(row){
            return r.db('lms').table('question').getAll(r.args(row('sub_module')), {index: "tags"})
            .filter({dificalty_index:row('dificalty_index')}).sample(row('amount'))
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

module.exports = new index();