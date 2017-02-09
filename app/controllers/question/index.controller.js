class index{

    select_question(req,res){
        var r = req._r;
        var params = req.params;

        //r.db('lms').table('question').orderBy(r.desc('time_insert'))
        r.db('lms').table('question').orderBy('time_insert')
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    select_question_only(req,res){
        var r = req._r;
        var params = req.query;

        r.db('lms').table('question').get(params.id)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
        
    }

    insert_question(req,res){
        var r = req._r;
        var params = req.body;

        //r.db('lms').table('question').insert(params)
        r.db('lms').table('question').insert({
            answer:params.answer,
            choice:params.choice,
            tag:params.tag,
            topic:params.topic,
            user_id:params.user_id,
            time_insert:r.now()
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    update_question(req,res){
        var r = req._r;
        var params = req.body;

        r.db('lms').table('question').get(params.id).update(params)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    delete_question(req,res){
        var r = req._r;
        var params = req.query;

        r.db('lms').table('question').get(params.id).delete()
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