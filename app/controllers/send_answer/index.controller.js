class index{

    send_answer(req,res){
        var r = req.r;
        var params = req.body;

        r.expr(params)
        .merge(function(x){
        return {
            count_question:x('question').count(),
            score:x('question')('choice').count(function(sc){
                return r.branch( sc.filter({ checked:true,answer:true }).count().eq(0), false, true )
            })
            }
        })
        .do(function(result){
            return r.db('lms').table('exam_answer').insert(result)
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