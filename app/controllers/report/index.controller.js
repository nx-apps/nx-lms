class index {
    report_onlyone(req, res) {
        var r = req.r;
        var params = req.query;

           r.db('lms').table("exam_test").filter({ exam_room_id:params.exam_room_id, _remark: 'last'}).hasFields('sum')
            .merge(function (data) {
              return r.db('lms').table('user').get(data('user_id'))
            }).filter(function(f){return f.ne(null)})
            .merge(function (data) {
              return r.db('lms').table('exam_room').get(data('exam_room_id'))
            })
           .pluck('emp_id', 'name', 'name_room', 'sum', 'module', 'round','qty_question').distinct()
           .orderBy(r.desc('sum'),'name_room', 'round')

/*
            r.db('lms').table('exam_room').get(params.exam_room_id) 
                .do(function (x) {
                    return r.db('lms').table('user').getAll(x('module'), '*', { index: 'tags' })
                        .merge(function (row) {
                            return { exam_room_id: x('id') ,user_id:row('id'), module:x('module'), name_room:x('name_room') }
                        })
                }).distinct()      
            .innerJoin( r.db('lms').table('exam_test').filter({
                exam_room_id:params.exam_room_id,
                _remark: 'last'
            }).hasFields('sum'), function(right,left){
                return right('user_id').eq(left('user_id'))
            }).zip()
            .pluck('emp_id','name','name_room','sum','module','round','qty_question')
*/
            .run()
            .then(function (result) {
                //res.json(result);
                var data={module:"555"};
                res.ireport("report_onlyone/report_onlyOne.jasper","excel", result, data);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

}


module.exports = new index();