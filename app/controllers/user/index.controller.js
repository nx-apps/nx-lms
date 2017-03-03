sha1 = require('js-sha1');

class index {

    select_user(req, res) {
        var r = req.r;
        var params = req.query;
        
        var filter=  r.db('lms').table("user");
        if(params.tags){
           filter= filter.getAll(r.args([params.tags,'*']),{index:'tags'});
        }
        filter.without('password').merge(function (c) {
            return {
                end_tags: c('end_tags').map(function (fc) { return r.db('lms').table('tag').get(fc) }),
                key_tags: c('key_tags').map(function (fc) { return r.db('lms').table('tag').get(fc) })
            }
        }).distinct()
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    select_user_only(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('user').get(params.id).without('password')
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    insert_user(req, res) {
        var r = req.r;
        var params = req.body;

        r.db('lms').table('user').filter({ email: params.email }).coerceTo('array')
            .do(function (result) {
                return r.branch(result.count().eq(0),
                    r.expr(params).merge(function () {
                        return { password: sha1(params.password) }
                    }).do(function (all) {
                        return r.db('lms').table('user').insert(all)
                    })
                    , { error: 'Duplicate Email' })
            })
            .run()
            .then(function (result) {

                if (result.error) {
                    res.status(500).json(result);
                } else {
                    res.json(result);
                }
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    update_user(req, res) {
        var r = req.r;
        var params = req.body;
        if (params.password)
            params.password = sha1(params.password)

        r.expr(params).do(function (resultParams) {
            return r.db('lms').table('user').filter(function (row) {
                return r.branch(row('id').eq(resultParams('id')), false,
                    r.branch(row('email').eq(resultParams('email')), true, false)
                )
            })
        }).coerceTo('array').count()
            .do(function (dup) {
                return r.branch(dup.eq(0),
                    r.db('lms').table('user').get(r.expr(params.id)).update(r.expr(params))
                    , { error: 'Duplicate Email' })
            })
            .run()
            .then(function (result) {
                if (result.error)
                    res.status(500).json(result)
                res.json(result)
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).json(err);
            })
    }

    delete_user(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('exam_test').filter({ user_id: params.id })
            .count()
            .run()
            .then(function (out) {
                if (out > 0) {
                    res.status(500).json({ error: "ผู้ใช้งานนี้มีการใช้งาน" });
                } else {
                    r.db('lms').table('user').get(params.id).delete()
                        .run()
                        .then(function (result) {
                            res.json(result);
                        })
                        .catch(function (err) {
                            res.status(500).json(err);
                        })
                }
            })


    }

}

module.exports = new index();