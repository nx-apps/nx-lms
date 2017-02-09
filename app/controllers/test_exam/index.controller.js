class index{

    select_exam(req,res){
        var r = req._r;
        var params = req.query;

        r.db('lms').table('examination').get(params.id)
        //r.db('lms').table('examination').get('68696620-91d5-4ab3-b901-7f623d6e8463')
        .merge(function(x){
            return {
                question:x('question').merge(function(q){
                    return r.db('lms').table('question').get(q('question_id'))
                }).pluck('answer','choice','question_id','obj_index','topic')
            .merge(function(a){
                return {choice:a('choice').merge(function(cf){return {checked:false} })}
            })
            }
        }).pluck('id','question','description','ex_name')
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