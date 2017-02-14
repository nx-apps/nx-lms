class index{

    select_exam(req,res){
        var r = req.r;
        var params = req.query;

            r.db('lms').table('exam_room').filter({id:params.id})
            .innerJoin(r.db('lms').table('examination'), function(x,xx){
                return x('examination_id').eq(xx('id'))
            }).map(function(mr){
                return mr('right')
            })
            .merge(function(x){
                return {
                    question:x('question').sample(x('question').count()).merge(function(q){
                        return r.db('lms').table('question').get(q('question_id')).merge(function(ran){
                            return {choice:ran('choice').sample(ran('choice').count())}
                        })
                    }).pluck('answer','choice','question_id','obj_index','topic','image_id')
                //.merge(function(a){
                    //return {choice:a('choice').merge(function(cf){return {checked:false} })}
                //})
                }
            }).pluck('id','question','description','ex_name')
/*
        r.db('lms').table('examination').get(params.id)
        .merge(function(x){
            return {
                question:x('question').sample(x('question').count()).merge(function(q){
                    return r.db('lms').table('question').get(q('question_id')).merge(function(ran){
                        return {choice:ran('choice').sample(ran('choice').count())}
                    })
                }).pluck('answer','choice','question_id','obj_index','topic','image_id')
            .merge(function(a){
                return {choice:a('choice').merge(function(cf){return {checked:false} })}
            })
            }
        }).pluck('id','question','description','ex_name')
*/
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