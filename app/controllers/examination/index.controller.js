class index {
    select_examination(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('examination').getAll(params.module, { index: 'module' }).orderBy('name_examination')
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    select_examination_only(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('examination').get(params.id)
            /*.merge(function(x){
                return {
                    question:x('question').merge(function(q){
                        return r.db('lms').table('question').get(q('question_id'))
                    })
                }
            })*/
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    insert_examination(req, res) {
        var r = req.r;
        var params = req.body;

        r.expr(params).merge(function () {
            return { time_insert: r.now() }
        }).do(function (result) {
            return r.db('lms').table('examination').insert(result)
        })
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    update_examination(req, res) {
        var r = req.r;
        var params = req.body;

        r.db('lms').table('examination').get(params.id).update(params)
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    delete_examination(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_room').filter({ examination_id: params.id })
            .count()
            .run()
            .then(function (out) {
                if (out > 0) {
                    res.status(500).json({ error: "ชุดข้อสอบนี้มีการใช้งาน" });
                } else {
                    r.db('lms').table('examination').get(params.id).delete()
                        .run()
                        .then(function (result) {
                            res.json(result);
                        })
                        .catch(function (err) {
                            res.status(500).json(err);
                        })
                }
            });


    }

    random_examination(req, res) {
        var r = req.r;
        var params = req.body;
        /* 
         r.expr(params)
         .concatMap(function(row){
             return r.db('lms').table('question').getAll(r.args(row('sub_module')), {index: "tags"})
             .filter({dificalty_index:row('dificalty_index')}).sample(row('amount'))
         })
         */

        r.expr(params).merge(function (m) {
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
                    d: m('d').pluck('id').distinct()
                }
            })
            .merge(function (m) {
                return {
                    d: r.branch(
                        m('d').count().gt(0)
                        , m('d').merge(function (ref_map) {
                            return r.db('lms').table('question').get(ref_map('id'))
                            //.pluck('id', 'ref_id', 'ref_index', 'question')
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
            //
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    print(req, res) {
        var qs = req.body.data;
        var ans = req.body.ans;
        var header=req.body.header;
        //console.log(header);

        res.render('listExam', {
            name_examination: header.name_examination,
            description: header.description,
            user: req.user,
            time: header.time,
            objectives: header.objective,
            qty_question: qs.length,
            datas: qs,
            ans:ans
        });
    }

}


module.exports = new index();