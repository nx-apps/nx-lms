
class examHistory {
/*
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
*/

select_ExamList(req,res){
    var r = req.r;
    var params = req.query;
    
    r.db('lms').table('user').filter({id:params.user_id})
    .merge(function(x){return { result: [x('end_tags'),x('key_tags')]  }  })
    .concatMap(function(xx){
        return xx('result').concatMap(function(i){return i })
    }).coerceTo('array').distinct()
    
    .do(function(x){
        //return r.db('lms').table('exam_room').getAll(r.args(x),{index:'module'}).filter({enable:true})
    return r.db('lms').table('exam_room').getAll(r.args(x),{index:'module'}).filter(function(row){
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
    })

    .run()
    .then(function(result){
        res.json(result);
    })
    .catch(function(err){
        res.status(500).json(err);
    })
}

select_question(req,res){
    var r = req.r;
    var params = req.query;

    r.db('lms').table('exam_room').filter({id:params.id})
    .innerJoin(r.db('lms').table('examination'), function(x,xx){
        return x('examination_id').eq(xx('id'))
    }).map(function(mr){
        return mr('right').merge(function(data){
          return {
            name_room:mr('left')('name_room'),
            room_id:mr('left')('id'),
            examination_id:mr('left')('examination_id')
          }
        })
    }).coerceTo('array')(0)
    
    .do(function(x){
        return {
            name_examination:x('name_examination'),
            examination_id:x('examination_id'),
            name_room:x('name_room'),
            description:x('description'),
            question :x('objective')
            .concatMap(function(row){
                return r.db('lms').table('question').getAll(r.args(row('sub_module')), {index: "tags"})
                .filter({dificalty_index:row('dificalty_index')}).sample(row('amount'))
            })
            }
    })

    .merge(function(x){
            return {
                question:x('question').merge(function(ran){
                    return { choice:ran('choice').sample( ran('choice').count()).without('check')}
                })
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

getHistoryList(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_answer').filter({user_id:params.user_id})
        .innerJoin(r.db('lms').table('exam_room'), function(x,xx){
            return x('exam_room_id').eq(xx('id'))
        }).map(function(result){
            return result('left').merge(function(name){
            return  {name_room: result('right')('name_room') }
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