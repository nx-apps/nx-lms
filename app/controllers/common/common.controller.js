class common {

    getModule(req, res) {
        var r = req.r;
        var params = req.query;

        if (params.getall == "true") {
            params.getall = true;
        } else {
            params.getall = false;
        }

        var user = req.user;
        console.log(req.user);
        if (params.allModule == "true") {
            user.key_tags.push('*');
        }

        if (!user) {
            user = {
                role: "admin",
                key_tags: []
            }
        }
        r.branch(
            r.expr(user.role).eq('admin').or(r.expr(user.key_tags).contains('*')),
            r.db('lms').table('tag').orderBy('id').pluck('id')('id').do(function (result) {
                return r.branch(r.expr(params.getall).eq(true),
                    result
                    ,
                    result.filter(function (row) {
                        return row.ne('*')
                    })
                );
            })

            ,
            r.db('lms').table('tag').orderBy('id').pluck('id')('id')
                .filter(function (row) {
                    return r.expr(user.key_tags).contains(row)
                })
        )
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })




    }

    getModule2(req, res) {
        var r = req.r;
        var params = req.query;

        if (params.getall == "true") {
            params.getall = true;
        } else {
            params.getall = false;
        }

       var user = req.user;
       // console.log(req.user);
       // if (params.allModule == "true") {
          //  user.key_tags.push('*');
       // }

        if (!user) {
            user = {
                role: "admin",
                key_tags: []
            }
        }
        r.branch(
            r.expr(user.role).eq('admin').or(r.expr(user.key_tags).contains('*')),
            r.db('lms').table('tag').orderBy('id').pluck('id')('id').do(function (result) {
                return r.branch(r.expr(params.getall).eq(true),
                    result
                    ,
                    result.filter(function (row) {
                        return row.ne('*')
                    })
                );
            })

            ,
            r.db('lms').table('tag').orderBy('id').pluck('id')('id')
                .filter(function (row) {
                    return r.expr(user.key_tags).contains(row)
                })
        )
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })




    }
}

module.exports = new common();