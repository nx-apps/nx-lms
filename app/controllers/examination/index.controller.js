class index{

    select_examination(req,res){
        var r = req._r;
        var params = req.params;

        r.db('lms').table('examination')
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    select_examination_only(req,res){
        var r = req._r;
        var params = req.query;

        r.db('lms').table('examination').get(params.id)
        .merge(function(x){
            return {
                question:x('question')('question_id').map(function(q){
                    return r.db('lms').table('question').get(q)
                })
            }
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    insert_examination(req,res){
        var r = req._r;
        var params = req.body;

        r.db('lms').table('examination').insert(params)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    update_examination(req,res){
        var r = req._r;
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
        var r = req._r;
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
        var r = req._r;
        var params = req.body;
        //r.db('lms').table('question').getAll(r.args(tags), {index: "tag"}).sample(2)
        r.expr(params).concatMap(function (row)  {
            return r.db('lms').table('question').getAll(r.args(row('obj_tag')), {index: "tag"}).sample(row('obj_qty')).coerceTo('array')
            .merge(function(id){
                return row.pluck('obj_index')
            })
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