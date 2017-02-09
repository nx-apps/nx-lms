class index{

    select_exam(req,res){
        var r = req._r;
        var params = req.query;

        r.db('lms').table('examination').get(params.id)
        .merge(function(x){
            return {
                question:x('question').merge(function(q){
                    return r.db('lms').table('question').get(q('question_id'))
                }).pluck('answer','choice','question_id','obj_index','topic')
            }
        }).pluck('id','question')
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