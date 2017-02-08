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

    random_examination(req,res){
        var r = req._r;
        var params = req.body;

        //r.db('lms').table('question').getAll(r.args(tags), {index: "tag"}).sample(2)
        params.concatMap(function (row)  {
            return r.db('lms').table('question').getAll(r.args(row('tag')), {index: "tag"}).sample(row('topic')).coerceTo('array')
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