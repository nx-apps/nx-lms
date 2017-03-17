class index {
    report_onlyone(req, res) {
        var r = req.r;
        var params = req.query;

        //r.db('lms').table("exam_room").filter({ module: 'CO' }).pluck('id', 'module', 'name_room', 'examination_id')
  
        r.db('lms').table("exam_test").filter({ exam_room_id:params.exam_room_id })
            .merge(function (data) {
                return r.db('lms').table('user').get(data('user_id'))
                    .merge(function () {
                        return r.db('lms').table('exam_room').get(data('exam_room_id'))
                    })
            })
            .pluck('emp_id', 'name', 'name_room', 'sum', 'module', 'round','qty_question')
            .orderBy('name', 'name_room', 'round', 'sum').distinct()
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