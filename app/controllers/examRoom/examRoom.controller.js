
class examRoom {
/*
    getExaminationList(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('examination')
        //.filter({user_id:params.user_id})
        .pluck('id','ex_name')
        .coerceTo('array')
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
        
    }

    getLearnerList(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('user').filter({role:'learner'})
        .pluck('id','name')
        .coerceTo('array')
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
        
    }

    getExamRoomList(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room')
        //.filter({user_id:params.user_id})
        .pluck('name','id')
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    selectExamRoom(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').filter({id:params.id})(0)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    insertExamRoom(req,res){
        var r = req.r;
        var params = req.body;
        var time = new Date();

        r.expr(params).merge(function(row){
            return {time_create:time,time_update:time}
        }).do(function(data){
            return r.db('lms').table('exam_room').insert(data)
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    updateExamRoom(req,res){
        var r = req.r;
        var params = req.body;
        var time = new Date();

        r.expr(params).merge(function(row){
            return {time_update:time}
        }).do(function(data){
            return r.db('lms').table('exam_room').get(data('id'))
            .update(data.without('id'))
        })

        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    deleteExamRoom(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').get(params.id).delete()
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    getLearnerTestList(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_answer').filter({exam_room_id:params.id})
        .innerJoin(
            r.db('lms').table('user').filter({role:'learner'}).pluck('name','id'),function(left,right){
                return left('user_id').eq(right('id'))
            }
        )
        .map(function(row){
            return row('right')
            .merge(function(row2){
                return row('left').pluck('score','exam_room_id')
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
    
    getUserModuleList(req,res){
        var r = req.r;
        var params = req.query;
        
        r.db('lms').table('user').getAll(params.module,{index:'tags'})
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })  
    }
*/

    select_ExamRoom(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').getAll(params.module, {index:'module'}).orderBy('time_update')
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    insert_ExamRoom(req,res){
        var r = req.r;
        var params = req.body;
        var time = new Date();

        r.expr(params).merge(function(row){
            return {time_create:time,time_update:time}
        }).do(function(data){
            return r.db('lms').table('exam_room').insert(data)
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    select_ExamRoom_only(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').get(params.id)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    update_ExamRoom(req,res){
        var r = req.r;
        var params = req.body;
        var time = new Date();

        r.expr(params).merge(function(row){
            return {time_update:time}
        }).do(function(data){
            return r.db('lms').table('exam_room').get(data('id'))
            .update(data.without('id'))
        })

        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    delete_ExamRoom(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').get(params.id).delete()
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    select_Module(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('examination').getAll(params.module, {index: "module"}).pluck('id','name_examination')
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
        
    }

    select_student(req,res){
        var r = req.r;
        var params = req.query;
    
        r.db('lms').table('exam_answer').filter({exam_room_id:params.id})
            .innerJoin(r.db('lms').table('user'), function(x,xx){
            return x('user_id').eq(xx('id'))
            }).map(function(data){
            return data('left').merge(function(mr){
                return {name:data('right')('name'),user_id:data('right')('id')}
            })
            }).without('question')

        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }
}

module.exports = new examRoom();