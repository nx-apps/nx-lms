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

    show_answer(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_answer').filter({
            user_id:params.user_id,
            exam_room_id:params.exam_room_id
        }).innerJoin(r.db('lms').table('exam_room'),function(x,xx){
                return x('exam_room_id').eq(xx('id'))
            }).map(function(n){
                return n('left').merge(function(){
                return {name:n('right')('name'),time:n('right')('time')}
            })
            }).innerJoin(r.db('lms').table('examination'),function(x,xx){
                return x('examination_id').eq(xx('id'))
            }).map(function(n){
                return n('left').merge(function(){
                return {ex_name:n('right')('ex_name'),description:n('right')('description')}
            })
            })
            .innerJoin(r.db('lms').table('user'),function(x,xx){
                return x('user_id').eq(xx('id'))
            }).map(function(n){
                return n('left').merge(function(){
                return {std_name:n('right')('name')}
            })
        }).without('user_id','exam_room_id','id','examination_id')(0)
      /*  .merge(function(q){
            return {  question: q('question').map(function(x){
            return {
                question_id:x('question_id'),
                topic:x('topic'),
                correct:x('choice').filter({checked:true}),
                answer:x('choice').filter({answer:true}),
                }
            })  }
        })(0)
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