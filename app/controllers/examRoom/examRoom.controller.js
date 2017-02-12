
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



}

module.exports = new examRoom();