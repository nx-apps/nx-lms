const jwt = require('jsonwebtoken');
const SECRET_KEY = "จริงๆแล้วก็ไม่รู้ว่าจะใส่อะไรดีที่เป็นความลับอะนะ";

class examRoom {


    select_ExamRoom(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').getAll(params.module, { index: 'module' }).orderBy(r.desc('time_update'))
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    insert_ExamRoom(req, res) {
        var r = req.r;
        var params = req.body;

        var start_date, end_date, start_time = "";
        r.db('lms').table('examination').get(params.examination_id)
            .then((result) => {
                switch (params.case_time) {
                    case 'allDay':
                        start_date = new Date(params.start_date + 'T00:00:00.000Z');
                        start_date.setHours(start_date.getHours() - 7);
                        start_date = start_date.toISOString();

                        end_date = new Date(params.start_date + 'T23:59:59.000Z');
                        end_date.setHours(end_date.getHours() - 7);
                        end_date = end_date.toISOString();
                        break;
                    case 'period':
                        start_date = new Date(params.start_date + 'T00:00:00.000Z');
                        start_date.setHours(start_date.getHours() - 7);
                        start_date = start_date.toISOString();

                        end_date = new Date(params.end_date + 'T23:59:59.000Z');
                        end_date.setHours(end_date.getHours() - 7);
                        end_date = end_date.toISOString();
                        break;
                    case 'time':
                        start_date = new Date(params.start_date + 'T' + params.start_time + ':00.000Z');
                        start_date.setHours(start_date.getHours() - 7);
                        start_date = start_date.toISOString();

                        end_date = new Date(params.start_date + 'T' + params.start_time + ':00.000Z');
                        end_date.setMinutes(end_date.getMinutes() + result.time);
                        end_date.setHours(end_date.getHours() - 7);
                        end_date = end_date.toISOString();
                        start_time = params.start_time;
                }

                params.period_start_date = start_date;
                params.period_end_date = end_date;
                params.start_time = start_time;

                var dateNow = new Date();
                params.create_time = dateNow.toISOString();
                params.update_time = dateNow.toISOString();

                r.db('lms').table('exam_room').insert(params)
                    .then((result) => {
                        return res.json(result);
                    }).catch((err) => {
                        return res.status(500).json(err)
                    })

            }).catch((err) => {
                return res.status(500).json(err)
            })

    }

    select_ExamRoom_only(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').get(params.id)
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    update_ExamRoom(req, res) {
        var r = req.r;
        var params = req.body;

        var start_date, end_date, start_time = "";
        r.db('lms').table('examination').get(params.examination_id)
            .then((result) => {
                switch (params.case_time) {
                    case 'allDay':
                        start_date = new Date(params.start_date + 'T00:00:00.000Z');
                        start_date.setHours(start_date.getHours() - 7);
                        start_date = start_date.toISOString();

                        end_date = new Date(params.start_date + 'T23:59:59.000Z');
                        end_date.setHours(end_date.getHours() - 7);
                        end_date = end_date.toISOString();
                        break;
                    case 'period':
                        start_date = new Date(params.start_date + 'T00:00:00.000Z');
                        start_date.setHours(start_date.getHours() - 7);
                        start_date = start_date.toISOString();

                        end_date = new Date(params.end_date + 'T23:59:59.000Z');
                        end_date.setHours(end_date.getHours() - 7);
                        end_date = end_date.toISOString();
                        break;
                    case 'time':
                        start_date = new Date(params.start_date + 'T' + params.start_time + ':00.000Z');
                        start_date.setHours(start_date.getHours() - 7);
                        start_date = start_date.toISOString();

                        end_date = new Date(params.start_date + 'T' + params.start_time + ':00.000Z');
                        end_date.setMinutes(end_date.getMinutes() + result.time);
                        end_date.setHours(end_date.getHours() - 7);
                        end_date = end_date.toISOString();
                        start_time = params.start_time;
                }

                params.period_start_date = start_date;
                params.period_end_date = end_date;
                params.start_time = start_time;

                var dateNow = new Date();
                params.create_time = dateNow.toISOString();
                params.update_time = dateNow.toISOString();
                var exam_room_id = params.id;
                delete params.id;
                r.db('lms').table('exam_room').get(exam_room_id).update(params)
                    .then((result) => {
                        return res.json(result);
                    }).catch((err) => {
                        return res.status(500).json(err)
                    })

            }).catch((err) => {
                return res.status(500).json(err)
            })
    }

    delete_ExamRoom(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').get(params.id).delete()
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    select_Module(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('examination').getAll(params.module, { index: "module" }).pluck('id', 'name_examination')
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })

    }

    select_student(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_test').filter({ exam_room_id: params.id, status: 'complete' })
            .innerJoin(r.db('lms').table('user'), function (left, right) {
                return left('user_id').eq(right('id'))
            }).map(function (row) {
                return row('left').merge(function (row2) {
                    return row('right').pluck('name')
                })
            })
            .then(function (result) {
                for (var i = 0; i < result.length; i++) {
                    var answer_url = jwt.sign({ id: result[i].id, user_id: req.user.id }, SECRET_KEY, {
                        expiresIn: '1 days'
                    });
                    result[i].answer_url = answer_url;
                }
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }
}

module.exports = new examRoom();