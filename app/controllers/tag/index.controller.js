class index{

    select_tag(req,res){
        var r = req.r;
        var params = req.query;
        r.db('lms').table('tag')
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    select_tag_only(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('tag').get(params.id)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
        
    }

    insert_tag(req,res){
        var r = req.r;
        var params = req.body;

        r.db('lms').table('tag').insert(params)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    update_tag(req,res){
        var r = req.r;
        var params = req.body;

        r.db('lms').table('tag').get(params.id).update(params)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    delete_tag(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('tag').get(params.id).delete()
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