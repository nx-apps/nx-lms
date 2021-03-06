//const auth = require('../auth');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "จริงๆแล้วก็ไม่รู้ว่าจะใส่อะไรดีที่เป็นความลับอะนะ";

class controlTest {
    rendomTest(exam_room_id, user_id, r, callback) {
        r.db('lms_erp').table('exam_test').filter({ exam_room_id: exam_room_id, user_id: user_id, _remark: "retest" })
            // .count()
            //start_time
            .orderBy('start_time')
            .run()
            .then(function (his) {
                if (his.length > 0) {
                    var exam_his_id = his[his.length - 1].id;
                    r.db('lms_erp').table('exam_test_detail').filter({ exam_test_id: exam_his_id })
                        .without("id")
                        .merge(function (q) {
                            return { id: q('question_id') }
                        })
                        .without('question_id')
                        .run()
                        .then(function (questions) {
                            callback(questions);
                        }).catch(function (err) {
                            callback({ error: err });
                        });

                } else {


                    r.db('lms_erp').table('exam_room').get(exam_room_id)
                        .do(function (exam_room) {
                            return r.db('lms_erp').table('examination').get(exam_room('examination_id')).merge(function (row) {
                                return {
                                    question: row('objective')
                                        .merge(function (m) {
                                            return {
                                                a: r.db('lms_erp').table('question')
                                                    .getAll(r.args(m('sub_module')), { index: 'tags' })
                                                    .filter({ dificalty_index: m('dificalty_index') })
                                                    .sample(m('amount')).coerceTo('array')
                                            }
                                        })
                                        .merge(function (m) {
                                            return {
                                                b: m('a').filter(function (ff) {
                                                    return ff.hasFields('ref_id').and(ff('ref_index').gt(1))
                                                }).coerceTo('array')

                                            }
                                        })
                                        .merge(function (m) {
                                            return {
                                                c: m('b').map(function (b_map) {
                                                    return r.branch(
                                                        m('a').filter({ ref_id: b_map('ref_id'), ref_index: 1 }).count().gt(0),
                                                        { del: true },
                                                        b_map.merge({ del: false })
                                                    )
                                                })
                                                    .filter(function (ff) {
                                                        return ff('del').eq(true).not()
                                                    })
                                                    .without('del')

                                            }
                                        })
                                        .merge(function (m) {
                                            return {
                                                d: r.branch(
                                                    m('c').count().gt(0)
                                                    , m('c').merge(function (ref_map) {
                                                        return r.db('lms_erp').table('question').filter({
                                                            ref_id: ref_map('ref_id'),
                                                            ref_index: 1
                                                        }).pluck('id', 'ref_id', 'ref_index', 'question', 'image_id')(0)
                                                    })
                                                    , []
                                                )
                                            }
                                        })
                                        .merge(function (m) {
                                            return {
                                                e: m('d').union(m('c'))
                                            }
                                        })
                                        .merge(function (m) {
                                            return {
                                                f: m('e').union(m('a')).distinct().orderBy('ref_id', 'ref_index')
                                            }
                                        })
                                        .merge(function (m) {
                                            return {
                                                g: m('f').limit(m('amount'))
                                            }
                                        })
                                        .getField('g')
                                        .reduce(function (l, r) {
                                            return l.add(r)
                                        })
                                        .merge(function (t) {
                                            return { choice: t('choice').sample(t('choice').count()) }
                                        })
                                        .do(function (x) {
                                            return { question: x, count: x.count() }
                                        })

                                        .merge(function (t) {
                                            return { question: t('question').sample(t('count')) }
                                        }).pluck('question').coerceTo('array')(0)(1)
                                        .orderBy('ref_id', 'ref_index')


                                }//end return 
                            })//end merge
                        }).without('objective')
                        .run()
                        .then(function (out) {
                            if (out.question.length > 0) {
                                callback(out.question);
                            } else {
                                callback({ error: "RandomTest : ไม่พบข้อสอบ" });
                            }
                        }).catch(function (err) {
                            callback({ error: err });
                        });





                }
            })



    }

    insertExamTest(exam_room_id, user_id, r, callback) {

        r.db('lms_erp').table('exam_test').filter({ exam_room_id: exam_room_id, user_id: user_id, _remark: "retest" })
            .count()
            .run()
            .then(function (out) {
                var round = 1;
                if (out > 0) {
                    round =round+(out++);
                }

                r.db('lms_erp').table('exam_test').filter({ exam_room_id: exam_room_id, user_id: user_id, _remark: "last" })
                    .run()
                    .then(function (exam_test) {
                        if (exam_test.length > 0) {
                            callback({ exam_test_id: exam_test[0].id });
                        } else {
                            r.db('lms_erp').table('exam_room').get(exam_room_id)
                                .merge(function (row) {
                                    return r.db('lms_erp').table('examination').get(row('examination_id')).pluck('time')
                                })
                                .then(resultExamRoom => {
                                    var start_time = new Date();
                                    start_time = start_time.toISOString();
                                    var countdown_time = "";
                                    switch (resultExamRoom.case_time) {
                                        case 'allDay':
                                            countdown_time = new Date(start_time);
                                            countdown_time.setMinutes(countdown_time.getMinutes() + resultExamRoom.time);
                                            countdown_time = countdown_time.toISOString();
                                            break;
                                        case 'period':
                                            countdown_time = new Date(start_time);
                                            countdown_time.setMinutes(countdown_time.getMinutes() + resultExamRoom.time);
                                            countdown_time = countdown_time.toISOString();
                                            break;
                                        case 'time':
                                            countdown_time = resultExamRoom.period_end_date;
                                    }
                                    r.db('lms_erp').table('exam_test').insert({
                                        exam_room_id: exam_room_id,
                                        user_id: user_id,
                                        start_time: start_time,
                                        end_time: '',
                                        countdown_time: countdown_time,
                                        status: 'working',
                                        case_time: resultExamRoom.case_time,
                                        _remark: "last",
                                        round:round
                                    }).run()
                                        .then(function (result) {

                                            if (result.generated_keys.length > 0) {
                                                callback({ exam_test_id: result.generated_keys[0] });
                                            } else {
                                                callback({ error: "insertExamTest error" });
                                            }
                                        })
                                        .catch(function (err) {
                                            callback({ error: err });
                                        });

                                }).catch(function (err) {
                                    callback({ error: err });
                                });

                        }
                    }).catch(function (err) {
                        callback({ error: err });
                    });



            })


    }

    insertExamTestDetail(exam_test_id, questions, r, callback) {

        var details = []
        for (var i = 0; i < questions.length; i++) {
            var q = questions[i];
            var detail = {
                question_id: q.id,
                exam_test_id: exam_test_id,
                image_id: q.image_id,
                question: q.question,
                choice: q.choice
            };
            details.push(detail);
        }

        r.db('lms_erp')
            .table('exam_test_detail')
            .insert(details)
            .run()
            .then(function (result) {
                if (result.generated_keys.length > 0) {

                    callback({ out: result.generated_keys });
                } else {
                    callback({ error: "insertExamTestDetail error" });
                }
            }).catch(function (err) {
                callback({ error: err });
            });
    }

    retest(exam_test_id, r, callback) {
        r.db('lms_erp').table('exam_test').get(exam_test_id).update({ _remark: "retest" })
            .run()
            .then(function (out) {
                callback({});
            })
            .catch(function (err) {
                callback({ error: err });
            });

    }

    deleteTest(exam_test_id, r, callback) {
        r.db('lms_erp').table('exam_test').get(exam_test_id).update({ _remark: "deleted" })
            .run()
            .then(function (out) {
                callback({});
            })
            .catch(function (err) {
                callback({ error: err });
            });

    }

    getExamTest(examid, userid, r, callback) {
        r.db('lms_erp').table('exam_test').filter({ exam_room_id: examid, user_id: userid, _remark: "last" }).coerceTo('array')(0)
            .do(function (data) {
                return data.merge(function (x) {
                    return { question: r.db('lms_erp').table('exam_test_detail').filter({ exam_test_id: data('id') }).coerceTo('array') }
                })
            })
            .merge(function (show) {
                return { question: show('question').merge(function (x) { return { choice: x('choice').without('check') } }) }
            })
            .merge(function (row) {
                return r.db('lms_erp').table('exam_room').get(row('exam_room_id'))('examination_id')
                    .do(function (examination_id) {
                        return r.db('lms_erp').table('examination').get(examination_id).pluck('name_examination', 'objective', 'description', "qty_question", 'time')
                    })
            })
            .merge(function (row) {
                return { user: r.db('lms_erp').table('user').get(row('user_id')).pluck('name', 'email') }
            })
            .run()
            .then(function (out) {
                if (out.question.length > 0) {
                    callback(out);
                } else {
                    callback({ error: "getExamTest error" });
                }
            }).catch(function (err) {
                callback({ error: err });
            });
    }
}



class examHistory {
    getTime(req, res) {
        var dateNow = new Date().toISOString();
        res.json({ date: dateNow });
    }
    get_answer(req, res) {
        var r = req.r;
        var params = req.query;
        var exam_test_id = params.exam_test_id;
        jwt.verify(exam_test_id, SECRET_KEY, function (err, decode) {

            if (err) {
                //reject({ error: 'wrong token' });
                // res.status(401).send("Unauthorized");
                res.status(403).send("คุณไม่สิทธิดูข้อสอบนี้");
            } else {
                exam_test_id = decode.id;
                if (decode.user_id != req.user.id) {
                    res.status(403).send("คุณไม่สิทธิดูข้อสอบนี้");
                } else {
                    r.db('lms_erp').table('exam_test').get(exam_test_id)
                        .merge(function (row) {
                            return {
                                question: r.db('lms_erp').table('exam_test_detail').filter({ exam_test_id: row('id') }).coerceTo('array')
                            }
                        })
                        .merge(function (row) {
                            return r.db('lms_erp').table('exam_room').get(row('exam_room_id'))
                        })
                        .merge(function (row) {
                            return r.db('lms_erp').table('examination').get(row('examination_id'))
                                .without('user_id')
                        })
                        .merge(function (row) {
                            return r.db('lms_erp').table('user').get(row('user_id'))
                        })
                        .pluck('name_examination', 'description', 'time', 'question', 'user_id', 'name', 'sum','round')

                        //r.db('lms_erp').table('exam_test_detail').filter({exam_test_id:'c971d1c4-2884-4481-8025-28250efb8906'})
                        .then(function (result) {
                            res.json(result);
                        })
                        .catch(function (err) {
                            res.status(500).json(err);
                        })
                }
            }
        });

    }


    getExamList(req, res) {
        var r = req.r;



        //  auth.userInfo(req).then(user => {
        var user = req.user;
        var dateNow = new Date().toISOString();

        var filter_module = r.db('lms_erp').table('exam_room');

        if (req.user.end_tags.indexOf('*') == -1) {
            filter_module = filter_module.getAll(r.args(req.user.end_tags), { index: 'module' });
        }

        filter_module.filter(function (row) {
            return r.expr(dateNow).lt(row('period_end_date')).and(
                r.expr(dateNow).gt(row('period_start_date')).and(r.expr(true).eq(row('enable')))
            )
        })
            // .merge(function (row) {
            //     return {
            //         tags: [r.db('lms_erp').table('tag').get(row('module'))],
            //         status: r.db('lms_erp').table('exam_test').coerceTo('array')
            //             .filter(function (row2) {
            //                 return row2('user_id').eq(user.id).and(
            //                        row2('exam_room_id').eq(row('id'))
            //                        .and(row2('_remark').eq(r.expr('last')))
            //                 )
            //             }).do(function (result) {
            //                 return r.branch(result.count().eq(0), 'wait', result(0)('status'))
            //         })
            //     }
            // })
            .merge(function (row) {
                return {
                    tags: [r.db('lms_erp').table('tag').get(row('module'))],
                    status: r.db('lms_erp').table('exam_test').getAll(user.id,{index:'user_id'}).coerceTo('array')
                        .filter(function (row2) {
                            return row2('exam_room_id').eq(row('id'))
                                   .and(row2('_remark').eq(r.expr('last')))
                        }).do(function (result) {
                            return r.branch(result.count().eq(0), 'wait', result(0)('status'))
                    })
                }
            })
            
            .merge(function (row) {
                return {
                    examination: r.db('lms_erp').table('examination')
                        .get(row('examination_id'))
                        .pluck('name_examination', 'amount_all', 'time')
                }
            })
           .orderBy(r.desc('start_date'))
            .filter(function (row) {
                return row('status').ne('complete')
            })

            .then(result => {
                for (var i = 0; i < result.length; i++) {

                    var test_url = jwt.sign({ id: result[i].id, user_id: req.user.id }, SECRET_KEY, {
                        expiresIn: '1 days'
                    });
                    result[i].test_url = test_url;
                }
                res.json(result);
            }).catch(err => {
                res.status(500).json(err);
            })

        //  }).catch(err => {
        //    res.status(500).json(err);
        // })



    }

    select_ExamList(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms_erp').table('user').filter({ id: params.user_id })
            // .merge(function(x){return { result: [x('end_tags'),x('key_tags')]  }  })
            .merge(function (x) { return { result: [x('end_tags')] } })
            .concatMap(function (xx) {
                return xx('result').concatMap(function (i) { return i })
            }).coerceTo('array').distinct()

            .do(function (x) {
                //return r.db('lms_erp').table('exam_room').getAll(r.args(x),{index:'module'}).filter({enable:true})
                return r.db('lms_erp').table('exam_room').getAll(r.args(x), { index: 'module' }).filter(function (row) {
                    return r.branch(
                        r.db('lms_erp').table('exam_answer').filter({
                            exam_room_id: row('id'),
                            user_id: params.user_id
                        }).count().ne(0)
                        ,
                        false
                        ,
                        true
                    ).and(row('enable').eq(true))
                })
            })

            .merge(function (result) {
                return {
                    tags: [r.db('lms_erp').table('tag').get(result('module'))]
                }
            })

            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    select_question(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms_erp').table('exam_room').filter({ id: params.id })
            .innerJoin(r.db('lms_erp').table('examination'), function (x, xx) {
                return x('examination_id').eq(xx('id'))
            }).map(function (mr) {
                return mr('right').merge(function (data) {
                    return {
                        name_room: mr('left')('name_room'),
                        exam_room_id: mr('left')('id'),
                        examination_id: mr('left')('examination_id')
                    }
                })
            }).coerceTo('array')(0)

            .do(function (x) {
                return {
                    name_examination: x('name_examination'),
                    examination_id: x('examination_id'),
                    name_room: x('name_room'),
                    description: x('description'),
                    time: x('time'),
                    exam_room_id: x('exam_room_id'),
                    question: x('objective')
                        /*
                        .concatMap(function(row){
                            return r.db('lms_erp').table('question').getAll(r.args(row('sub_module')), {index: "tags"})
                            .filter({dificalty_index:row('dificalty_index')}).sample(row('amount'))
                        })
                        */
                        .merge(function (m) {
                            return {
                                a: r.db('lms_erp').table('question')
                                    .getAll(r.args(m('sub_module')), { index: 'tags' })
                                    .filter({ dificalty_index: m('dificalty_index') })
                                    //.pluck('id', 'ref_id', 'ref_index', 'question')
                                    .sample(m('amount')).coerceTo('array')
                            }
                        })
                        .merge(function (m) {
                            return {
                                b: m('a').filter(function (ff) {
                                    return ff.hasFields('ref_id').and(ff('ref_index').gt(1))
                                }).coerceTo('array')

                            }
                        })
                        .merge(function (m) {
                            return {
                                c: m('b').map(function (b_map) {
                                    return r.branch(
                                        m('a').filter({ ref_id: b_map('ref_id'), ref_index: 1 }).count().gt(0),
                                        { del: true },
                                        b_map.merge({ del: false })
                                    )
                                })
                                    .filter(function (ff) {
                                        return ff('del').eq(true).not()
                                    })
                                    .without('del')

                            }
                        })
                        .merge(function (m) {
                            return {
                                d: r.branch(
                                    m('c').count().gt(0)
                                    , m('c').merge(function (ref_map) {
                                        return r.db('lms_erp').table('question').filter({
                                            ref_id: ref_map('ref_id'),
                                            ref_index: 1
                                        }).pluck('id', 'ref_id', 'ref_index', 'question')(0)
                                    })
                                    , []
                                )
                            }
                        })
                        .merge(function (m) {
                            return {
                                e: m('d').union(m('c'))
                            }
                        })
                        .merge(function (m) {
                            return {
                                f: m('e').union(m('a')).distinct().orderBy('ref_id', 'ref_index')
                            }
                        })
                        .merge(function (m) {
                            return {
                                g: m('f').limit(m('amount'))
                            }
                        })
                        .getField('g')
                        .reduce(function (l, r) {
                            return l.add(r)
                        })
                        .merge(function (t) {
                            return { choice: t('choice').sample(t('choice').count()).without('check') }
                        })
                        //
                        .do(function (x) {
                            return { question: x, count: x.count() }
                        })

                        .merge(function (t) {
                            return { question: t('question').sample(t('count')) }
                        }).pluck('question').coerceTo('array')(0)(1)
                        .orderBy('ref_id', 'ref_index')
                    //
                }
            })

            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    getHistoryList(req, res) {

        var r = req.r;
        var params = req.query;

        // r.db('lms_erp').table('exam_answer').filter({ user_id: params.user_id })
        // .innerJoin(r.db('lms_erp').table('exam_room'), function (x, xx) {
        //     return x('exam_room_id').eq(xx('id'))
        // }).map(function (result) {
        //     return result('left').merge(function (name) {
        //         return { name_room: result('right')('name_room'), module: result('right')('module'), setting: result('right')('setting') }
        //     })
        // })
        // .merge(function (result) {
        //     return {
        //         tags: [r.db('lms_erp').table('tag').get(result('module'))]
        //     }
        // })

        // .run()
        //auth.userInfo(req).then((user) => {
        var user = req.user;
        return r.db('lms_erp').table('exam_test')
            //  .filter({ status: 'complete', user_id: user.id  })
            .filter(function (row) {
                return row('status').eq(r.expr('complete'))
                    .and(row('user_id').eq(user.id))
                    .and(row('_remark').ne('deleted'))
            })
            .merge(function (row) {
                return {
                    name_room: r.db('lms_erp').table('exam_room').get(row('exam_room_id'))('name_room'),
                    count_question: row('qty_question')
                    //count_question: r.db('lms_erp').table('exam_test_detail').coerceTo('array')
                    //.filter({ exam_test_id: row('id') }).count()
                }
            })
            .merge(function (row) {
                return r.db('lms_erp').table('exam_room').get(row('exam_room_id'))
                    .merge(function (row2) {
                        return { tags: [r.db('lms_erp').table('tag').get(row2('module'))] }
                    }).pluck('name_room', 'setting', 'tags', 'score')

            })
            .orderBy(r.desc('start_time'),'exam_room_id','round')
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

        // })
        // .catch(err => {
        //      res.json(err);
        //  })



    }
    /*
        generateTest(req, res) {
            var r = req.r;
            //  console.log(req.params.exid);
            //  console.log(req.params.uid);
            // var userid = req.params.uid;
            var exam_test_id = req.params.exid;
            var control = new controlTest();
    
            jwt.verify(exam_test_id, SECRET_KEY, function (err, decode) {
                if (err) {
                    res.status(403).send("คุณไม่สิทธิดูข้อสอบนี้");
                } else {
                    exam_test_id = decode.id;
    
                    if (decode.user_id != req.user.id) {
                        res.status(403).send("คุณไม่สิทธิดูข้อสอบนี้");
                    } else {
                        control.getExamTest(exam_test_id, req.user.id, r, function (data) {
                            if (!data.error) {
                                var myDate = new Date(data.start_time);
                                res.render('listExam', {
                                    name_examination: data.name_examination,
                                    description: data.description,
                                    start_time: myDate,
                                    user: data.user,
                                    time: data.time,
                                    objectives: data.objective,
                                    qty_question: data.question.length,
                                    datas: data.question
                                });
                            } else {
                                res.send("ไม่พบข้อสอบ");
                            }
                        });
    
                    }
                }
            });
    
    
    
        }
    
    */



    getExam(req, res) {
        var r = req.r;
        var params = req.query;
        var control = new controlTest();
        //  auth.userInfo(req).then(user => {
        var user = req.user;
        var user_id = user.id;
        var exam_room_id = params.exam_room_id;
        // console.log(exam_room_id);

        jwt.verify(exam_room_id, SECRET_KEY, function (err, decode) {

            if (err) {
                //reject({ error: 'wrong token' });
                // res.status(401).send("Unauthorized");
                res.status(403).send("คุณไม่สิทธิทำข้อสอบนี้");
            } else {
                exam_room_id = decode.id;
                // console.log(exam_room_id);
                if (decode.user_id != req.user.id) {
                    res.status(403).send("คุณไม่สิทธิทำข้อสอบนี้");
                } else {

                    console.log("start get getExam");
                    control.getExamTest(exam_room_id, user_id, r, function (datas) {
                        console.log("getExamTest");
                        // console.log(datas);
                        if (!datas.error) {
                            res.json(datas);
                        } else {



                            control.rendomTest(exam_room_id, user_id, r, function (questions) {
                                console.log("rendomTest");
                                console.log(questions);
                                if (!questions.error) {
                                    control.insertExamTest(exam_room_id, user_id, r, function (exam_test) {
                                        console.log("insertExamTest");
                                        console.log(exam_test);
                                        if (!exam_test.error) {
                                            control.insertExamTestDetail(exam_test.exam_test_id, questions, r, function (details) {
                                                console.log("insertExamTestDetail");
                                                //  console.log(details);
                                                if (!details.error) {
                                                    control.getExamTest(exam_room_id, user_id, r, function (qq) {
                                                        console.log("getExamTest2");
                                                        //console.log(qq);
                                                        if (!qq.error) {
                                                            res.json(qq);
                                                        } else {
                                                            res.status(500).send(qq.error);
                                                        }
                                                    });
                                                }
                                                else {
                                                    res.status(500).send(details.error);
                                                }
                                            });
                                        } else {
                                            res.status(500).send(exam_test.error);
                                        }
                                    });
                                } else {
                                    res.status(500).send(questions.error);
                                }
                            });
                        }
                    });
                    //  });

                }
            }
        });
    }


    updateAnswer(req, res) {
        var r = req.r;
        var params = req.body;
        var answer = [];
        
        
        params.choice = params.choice.filter(function(row){
            if (row.answer) {
                return true
            }else{
                return false;
            }
        })

        if(params.choice.length==1){
            r.expr(params)
            .merge(function (x) {
                return r.db('lms_erp').table('exam_test_detail').get(x('id')).merge(function (xx) {
                    return { ans: x('choice')(0) }
                })
            })
            .merge(function (xx) {
                return {
                    choice: xx('choice').merge(function (a) {
                        return { answer: r.branch(a('name').eq(xx('ans')('name')), true, false) }
                    })
                }
            })
            .do(function (data) {
                return r.db('lms_erp').table('exam_test_detail').get(data('id')).update({ choice: data('choice') })
            })

            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })

        }else{
            res.json({error:'NOT SEND ANSWER.'});
        }
        
        


    }

    complete(req, res) {
        var r = req.r;
        var params = req.body;

        r.db('lms_erp').table('exam_test_detail').filter({ exam_test_id: params.exam_test_id })
            .merge(function (x) {
                return {
                    score: x('choice').filter({ answer: true, check: true }).count()
                }
            })
            .merge(function (x) {
                return {
                    correct: r.branch(x('score').eq(1), 1, 0),
                    incorrect: r.branch(x('score').eq(0), 1, 0)
                }
            }).coerceTo('array')


            .do(function (result) {

                return result.forEach(function (x) {
                    return r.db('lms_erp').table('question').get(x('question_id'))
                        .do(function (doo) {
                            return r.db('lms_erp').table('question').get(x('question_id'))
                                .update({
                                    correct: doo('correct').add(x('correct')),
                                    incorrect: doo('incorrect').add(x('incorrect'))
                                })
                        })
                })

                    .do(function () {
                        return {
                            sum: result('correct').sum(),
                            exam_test_id: result('exam_test_id')(0),
                            qty_question: result.count()
                        }
                    })

                    .do(function (x) {
                        return r.db('lms_erp').table('exam_test').get(x('exam_test_id')).update({
                            sum: x('sum'),
                            qty_question: x('qty_question'),
                            status: 'complete',
                            end_time:new Date()
                        })
                    })

            })

            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

        send_email_retest(req, res) {
        var r = req.r;
        var params = req.query;

            r.db('lms_erp').table('exam_test').filter(function(data){
            return data('_remark').ne('deleted')
                .and( data('sum').lt(data('qty_question').mul(80).div(100)))
            })
            .innerJoin(r.db('lms_erp').table('exam_room'),function(left,right){
                return left('exam_room_id').eq(right('id'))
            }).zip()
            .innerJoin(r.db('lms_erp').table('user'),function(left,right){
                return left('user_id').eq(right('id'))
            }).zip()
            .filter(function(data){
                return data.ne(null)
            })
            .pluck('sum','name_room','email','name','module')

            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

}

module.exports = new examHistory();