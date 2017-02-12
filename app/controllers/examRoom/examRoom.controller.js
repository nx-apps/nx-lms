
class examRoom {

    getExaminationList(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('examination').filter({user_id:params.user_id})
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

        r.db('lms').table('exam_room').filter({user_id:params.user_id})
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

        r.db('lms').table('exam_room').filter({id:params.id})
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



}

module.exports = new examRoom();