const auth = require('../auth');

class examHistory {

    getTime(req, res) {
        var dateNow = new Date().toISOString();
        res.json({date:dateNow});
    }

    get_answer(req,res){
        var r = req.r;
        var params = req.query;
        r.db('lms').table('exam_test').get(params.exam_test_id)
        .merge(function(row){
            return {
                question:r.db('lms').table('exam_test_detail').filter({exam_test_id:row('id')}).coerceTo('array')
            }
        })
        .merge(function(row){
            return r.db('lms').table('exam_room').get(row('exam_room_id'))
        })
        .merge(function(row){
            return r.db('lms').table('examination').get(row('examination_id'))
        })
        .merge(function(row){
            return r.db('lms').table('user').get(row('user_id'))
        })
        .pluck('name_examination','description','time','question','user_id','name')
        
        //r.db('lms').table('exam_test_detail').filter({exam_test_id:'c971d1c4-2884-4481-8025-28250efb8906'})
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    getExamList(req, res) {
        var r = req.r;

        auth.userInfo(req).then(user=>{
            var dateNow = new Date().toISOString();

            r.db('lms').table('exam_room').getAll(
                r.args(r.db('lms').table('user').get(user.id)('end_tags'))
                ,{index:'module'}
            )
            .filter(function(row){
                return r.expr(dateNow).lt(row('period_end_date')).and(
                    r.expr(dateNow).gt(row('period_start_date')).and({enable:true})
                )
            })
            .merge(function(row){
                return {
                    tags:[r.db('lms').table('tag').get(row('module'))],
                    status:r.db('lms').table('exam_test').coerceTo('array')
                    .filter(function(row2){
                        return row2('user_id').eq(user.id).and(
                            row2('exam_room_id').eq(row('id'))
                        )
                    }).do(function(result){
                        return r.branch(result.count().eq(0),'wait',result(0)('status'))
                    })
                }
            }).filter(function(row){
                return row('status').ne('complete')
            })
            
            .then(result=>{
                res.json(result);
            }).catch(err=>{
                res.status(500).json(err);
            })

        }).catch(err=>{
            res.status(500).json(err);
        })
        
        

    }

    select_ExamList(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('user').filter({ id: params.user_id })
            // .merge(function(x){return { result: [x('end_tags'),x('key_tags')]  }  })
            .merge(function (x) { return { result: [x('end_tags')] } })
            .concatMap(function (xx) {
                return xx('result').concatMap(function (i) { return i })
            }).coerceTo('array').distinct()

            .do(function (x) {
                //return r.db('lms').table('exam_room').getAll(r.args(x),{index:'module'}).filter({enable:true})
                return r.db('lms').table('exam_room').getAll(r.args(x), { index: 'module' }).filter(function (row) {
                    return r.branch(
                        r.db('lms').table('exam_answer').filter({
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
                    tags: [r.db('lms').table('tag').get(result('module'))]
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

        r.db('lms').table('exam_room').filter({ id: params.id })
            .innerJoin(r.db('lms').table('examination'), function (x, xx) {
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
                            return r.db('lms').table('question').getAll(r.args(row('sub_module')), {index: "tags"})
                            .filter({dificalty_index:row('dificalty_index')}).sample(row('amount'))
                        })
                        */
                        .merge(function (m) {
                            return {
                                a: r.db('lms').table('question')
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
                                        return r.db('lms').table('question').filter({
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

            // r.db('lms').table('exam_answer').filter({ user_id: params.user_id })
            // .innerJoin(r.db('lms').table('exam_room'), function (x, xx) {
            //     return x('exam_room_id').eq(xx('id'))
            // }).map(function (result) {
            //     return result('left').merge(function (name) {
            //         return { name_room: result('right')('name_room'), module: result('right')('module'), setting: result('right')('setting') }
            //     })
            // })
            // .merge(function (result) {
            //     return {
            //         tags: [r.db('lms').table('tag').get(result('module'))]
            //     }
            // })

            // .run()
            auth.userInfo(req).then((user)=>{
                return r.db('lms').table('exam_test')
                //.filter({status:'complete'})
                .merge(function(row){
                    return {
                        name_room:r.db('lms').table('exam_room').get(row('exam_room_id'))('name_room'),
                        count_question:r.db('lms').table('exam_test_detail').coerceTo('array')
                        .filter({exam_test_id:row('id')}).count(),
                        score:'ยังคิวรี่บ่ได้'
                    }
                })
                .merge(function(row){
                    return r.db('lms').table('exam_room').get(row('exam_room_id'))
                    .merge(function(row2){
                        return {tags:[r.db('lms').table('tag').get(row2('module'))]}
                    }).pluck('name_room','setting','tags')

                })
                .then(function (result) {
                    res.json(result);
                })
                .catch(function (err) {
                    res.status(500).json(err);
                })

            })
            .catch(err => {
                res.json(err);
            })

            

    }

     getExam(req, res) {
        var r = req.r;
        var params = req.query;
        //res.json(params);


        auth.userInfo(req).then(user => {
            params.user_id = user.id;
            

            r.db('lms').table('exam_room').get(params.exam_room_id)
            .merge(function(row){
                return r.db('lms').table('examination').get(row('examination_id')).pluck('time')
            })
            .then(resultExamRoom=>{

                
                
                var start_time = new Date();
                start_time = start_time.toISOString();
                var countdown_time = "";
                
                switch(resultExamRoom.case_time) {
                    case 'allDay':
                        countdown_time = new Date(start_time);
                        countdown_time.setMinutes(countdown_time.getMinutes()+resultExamRoom.time);
                        countdown_time = countdown_time.toISOString();
                        break;
                    case 'period':
                        countdown_time = new Date(start_time);
                        countdown_time.setMinutes(countdown_time.getMinutes()+resultExamRoom.time);
                        countdown_time = countdown_time.toISOString();
                        break;
                    case 'time':
                        countdown_time = resultExamRoom.period_end_date;
                }
                
                params.start_time = start_time;
                params.countdown_time = countdown_time;

                // res.json(params);
                r.expr(params).do(function (params) {

                    return r.db('lms').table('exam_test').filter({ exam_room_id: params('exam_room_id'), user_id: params('user_id') })
                        .coerceTo('array')
                        .do(function (result) {
                            return r.branch(result.count().eq(0),
                                //don't have
                                r.db('lms').table('exam_room').get(params('exam_room_id'))
                                    .do(function (exam_room) {
                                        return r.db('lms').table('examination').get(exam_room('examination_id')).merge(function (row) {
                                            return {

                                                question: row('objective')
      
                                                    .merge(function (m) {
                                                        return {
                                                            a: r.db('lms').table('question')
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
                                                                    return r.db('lms').table('question').filter({
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
                                    }).without('objective') //end do

                                    .do(function (random) {
                                        return r.db('lms').table('exam_test').insert({
                                            exam_room_id: params('exam_room_id'),
                                            user_id: params('user_id'),
                                            start_time: params('start_time'),
                                            end_time:'',
                                            countdown_time:params('countdown_time'),
                                            status: 'working',
                                            case_time: 'allDay'
                                        })

                                            .do(function (key) {
                                                return random.merge(function (x) { return { exam_test_id: key('generated_keys')(0) } })
                                            }).pluck('exam_test_id', 'question', 'user_id')

                                            .do(function (send) {
                                                return send('question').forEach(function(row){
                                                    return r.db('lms').table('exam_test_detail').insert(
                                                        row.pluck('question','choice','id').merge(function(x){
                                                            return {
                                                                exam_test_id:send('exam_test_id'),
                                                                question_id:x('id')
                                                            }
                                                        })
                                                    )
                                                })
                                            })
                                            .do(function(xd){
                                                return r.db('lms').table('exam_test').filter({ exam_room_id: params('exam_room_id'), user_id: params('user_id') }).coerceTo('array')(0)
                                                .do(function(data){
                                                    return data.merge(function(x){
                                                        return {question:r.db('lms').table('exam_test_detail').filter({exam_test_id:data('id')}).coerceTo('array')}
                                                    })
                                                })
                                            })
                                            .merge(function (show) {
                                                return {question:show('question').merge(function(x){return {choice:x('choice').without('check')} })}
                                            })
                                            .merge(function(row){
                                                return r.db('lms').table('exam_room').get(row('exam_room_id'))('examination_id')
                                                .do(function(examination_id){
                                                    return r.db('lms').table('examination').get(examination_id).pluck('name_examination','description')
                                                })
                                            })
                                     })
                                ,
                                //HAVE
                                r.db('lms').table('exam_test').filter({ exam_room_id: params('exam_room_id'), user_id: params('user_id') }).coerceTo('array')(0)
                                .do(function(data){
                                    return data.merge(function(x){
                                        return {question:r.db('lms').table('exam_test_detail').filter({exam_test_id:data('id')}).coerceTo('array')}
                                    })
                                })
                                .merge(function (show) {
                                    return {question:show('question').merge(function(x){return {choice:x('choice').without('check')} })}
                                })
                                .merge(function(row){
                                    return r.db('lms').table('exam_room').get(row('exam_room_id'))('examination_id')
                                    .do(function(examination_id){
                                        return r.db('lms').table('examination').get(examination_id).pluck('name_examination','description')
                                    })
                                })

                            )//end branch
                        })

                })

                .then((result)=>{
                    return res.json(result);
                })
                .catch(err => {
                    res.json(err);
                })

            })
        
        })
     }

     updateAnswer(req, res){
        var r = req.r;
        var params = req.body;

        r.expr(params)
        .merge(function(x){
            return r.db('lms').table('exam_test_detail').get(x('id')).merge(function(xx){
            return {ans:x('choice')(0)}
            })
        })
        .merge(function(xx){
            return {
            choice:xx('choice').merge(function(a){
                return { answer: r.branch( a('name').eq(xx('ans')('name')),true,false ) }
            })
            }
        })
        .do(function(data){
            return r.db('lms').table('exam_test_detail').get(data('id')).update({choice:data('choice')})
        })       

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