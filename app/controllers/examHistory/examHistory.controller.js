
class examHistory {

    getExamList(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').getAll("d4c3bab5-acdf-4444-b2b7-d1d083700907", {index: "learner"})
        // .innerJoin(r.db('lms').table('exam_answer').filter({learner_id:"d4c3bab5-acdf-4444-b2b7-d1d083700907"}),
        //     function(left,right){
        //         return left()
        //     }
        // )
        // .filter(function(row){
        //     return r.db('lms').table('answer')
        //     .filter({examination_id:"0b842908-dd9a-4d36-9735-a09a6855889e",learner_id:"d4c3bab5-acdf-4444-b2b7-d1d083700907"})
        //     .do(function(row2){
        //         return row('enable').eq(true)
        //     })
        // })
        // .pluck('id','ex_name')
        // .coerceTo('array')
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