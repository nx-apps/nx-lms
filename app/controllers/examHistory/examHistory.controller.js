
class examHistory {

    getExamList(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').getAll(params.user_id,{index:'learner'})
        .filter(function(row){
            return r.branch(
                r.db('lms').table('exam_answer').filter({exam_room_id:row('id')}).count().ne(0)
                ,
                false
                ,
                true
            ).and(row('enable').eq(true))
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

        r.db('lms').table('exam_answer').filter({user_id:params.user_id})
        .innerJoin(r.db('lms').table('exam_room'),function(left,right){
            return left('exam_room_id').eq(right('id'))
        })
        .map(function(row){
            return {
                exam_room_name:row('right')('name'),
                exam_answer_id:row('left')('id')
            }
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