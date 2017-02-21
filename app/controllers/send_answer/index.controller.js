class index{

    send_answer(req,res){
        var r = req.r;
        var params = req.body;

        r.expr(params)
        .merge(function(x){
        return {
            count_question:x('question').count(),
            score:x('question')('choice').count(function(sc){
                return r.branch( sc.filter({ check:true,answer:true }).count().eq(0), false, true )
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

    show_answer(req,res){
        var r = req.r;
        var params = req.query;
         r.db('lms').table('exam_answer').filter({
        user_id:params.user_id,
        examination_id:params.examination_id
        })
        .innerJoin(r.db('lms').table('user'),function(x,xx){
            return x('user_id').eq(xx('id'))
        }).map(function(n){
            return n('left').merge(function(){
            return {name:n('right')('name')}
            })
        })
        
        .innerJoin(r.db('lms').table('examination'),function(x,xx){
            return x('examination_id').eq(xx('id'))
        }).map(function(n){
            return n('left').merge(function(){
            return {time:n('right')('time'),description:n('right')('description'),name_examination:n('right')('name_examination')}
            })
        })
        .pluck('name','score','time','name_examination','description','question')(0)
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