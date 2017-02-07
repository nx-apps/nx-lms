class index{

    select_question(req,res){
        var r = req._r;
        var params = req.query;

        r.db('lms').table('question')
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
        var params = req.query;

        r.db('lms').table('question').insert(params)
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