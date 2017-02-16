
class examHistory {

    getExamList(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').getAll(params.user_id,{index:'learner'})
        .filter(function(row){
            return r.branch(
                r.db('lms').table('exam_answer').filter({
                    exam_room_id:row('id'),
                    user_id:params.user_id
                }).count().ne(0)
                ,
                false
                ,
                true
            ).and(row('enable').eq(true))
        })
        .innerJoin(r.db('lms').table('examination'),function(left,right){
            return left('examination_id').eq(right('id'))
        }).map(function(row){
            return row('left').merge(function(row2){
                return row('right').pluck('qty')
            })
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })

        
        
    }

    getHistoryList(req,res){
        var r = req.r;
        var params = req.query;
        params.module = params.module.toUpperCase();

        r.db('lms').table('exam_answer').filter({user_id:params.user_id})
        .innerJoin(r.db('lms').table('exam_room'),function(left,right){
            return left('exam_room_id').eq(right('id'))
        })
        .map(function(row){
            return row('left').pluck('count_question','score','exam_room_id')
            .merge(function(row2){
                return {
                    exam_room_name:row('right')('name'),
                    exam_answer_id:row('left')('id')
                }
            })
            
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

module.exports = new examHistory();