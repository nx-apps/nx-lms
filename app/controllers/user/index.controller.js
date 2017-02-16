class index{

    select_user(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('user').getAll(params.tags, {index:'tags'})
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

        r.db('lms').table('user').insert(params)
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