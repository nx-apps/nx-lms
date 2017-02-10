class index{

    select_student(req,res){
        var r = req.r;
        var params = req.params;

        r.db('lms').table('student')
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    insert_student(req,res){
        var r = req.r;
        var params = req.body;

        r.db('lms').table('student').insert(params)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    update_student(req,res){
        var r = req.r;
        var params = req.body;

        r.db('lms').table('student').get(params.id).update(params)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    delete_student(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('student').get(params.id).delete()
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