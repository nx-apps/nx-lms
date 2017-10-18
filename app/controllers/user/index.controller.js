sha1 = require('js-sha1');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "จริงๆแล้วก็ไม่รู้ว่าจะใส่อะไรดีที่เป็นความลับอะนะ";

class index {

    current_user(req, res) {
        var u = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            emp_id: req.user.emp_id,
            end_tags: req.user.end_tags
        };
        res.json(u);
    }
    select_user(req, res) {
        var r = req.r;
        var params = req.query;

        var filter = r.db('lms_erp').table("user");
        if (params.tags) {
            filter = filter.getAll(r.args([params.tags, '*']), { index: 'tags' });
        }
        filter.without('password').merge(function (c) {
            return {
                end_tags: c('end_tags').map(function (fc) { return r.db('lms_erp').table('tag').get(fc) }),
                key_tags: c('key_tags').map(function (fc) { return r.db('lms_erp').table('tag').get(fc) })
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

        r.db('lms_erp').table('user').get(params.id).without('password')
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

        r.db('lms_erp').table('user').filter({ email: params.email.toLowerCase() }).coerceTo('array')
            .do(function (result) {
                return r.branch(result.count().eq(0),
                    r.expr(params).merge(function () {
                        return { password: sha1(params.password) }
                    }).do(function (all) {
                        return r.db('lms_erp').table('user').insert(all)
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
            return r.db('lms_erp').table('user').filter(function (row) {
                return r.branch(row('id').eq(resultParams('id')), false,
                    r.branch(row('email').eq(resultParams('email')), true, false)
                )
            })
        }).coerceTo('array').count()
            .do(function (dup) {
                return r.branch(dup.eq(0),
                    r.db('lms_erp').table('user').get(r.expr(params.id)).update(r.expr(params))
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

        r.db('lms_erp').table('exam_test').filter({ user_id: params.id })
            .count()
            .run()
            .then(function (out) {
                if (out > 0) {
                    res.status(500).json({ error: "ผู้ใช้งานนี้มีการใช้งาน" });
                } else {
                    r.db('lms_erp').table('user').get(params.id).delete()
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

    register_user(req, res) {
        var r = req.r;
        var params = req.body;
        params.status = true;
        params.email = params.email.toLowerCase();
        params.key_tags=[];

        r.db('lms_erp').table('user').filter({ email: params.email.toLowerCase() })
            .count()
            /*.coerceTo('array')
            .do(function (result) {
                return r.branch(result.count().eq(0),
                    r.expr(params).merge(function () {
                        return { password: sha1(params.password) }
                    }).do(function (all) {
                        return r.db('lms_erp').table('user').insert(all)
                    })
                    , { error: 'Email นี้มีอยู่ในระบบแล้ว กรุณากรอก Email ใหม่' })
            })*/
            .run()
            .then(function (out) {

                if (out > 0) {
                    res.status(500).json({ error: 'Email นี้มีอยู่ในระบบแล้ว กรุณากรอก Email ใหม่' });
                } else {
                    //var uid = result.generated_keys[0];
                    var uid = jwt.sign(params, SECRET_KEY, {
                        expiresIn: '30m'
                    });
                    var mailer = require("nodemailer");
                    var smtpTransport = mailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: "quiz.btg@gmail.com",
                            pass: "next@2017"
                        }
                    });
                    var html = "<p>ชื่อผู้ใช้งาน : " + params.name + "</p>";
                    html += "<p>รหัสพนักงาน : " + params.emp_id + "</p>";
                    html += "<p>email/user : " + params.email + "</p>";
                    html += "<a href='https://quiz.nexts-corp.com/api/user/verify?uid=" + uid + "'>กรุณายืนยันการลงทะเบีัยนระบบคลังข้อสอบ (Betagro)</a>";


                    var mail = {
                        from: "quiz service <quiz.btg@gmail.com>",
                        to: params.email,
                        subject: "กรุณายืนยันการลงทะเบียนระบบคลังข้อสอบ (Betagro)",
                        //text: "Password : "+ user.emp_id,
                        html: html
                    }

                    smtpTransport.sendMail(mail, function (error, response) {
                        if (error) {
                            console.log(error);
                            res.status(500).json({ error: error });
                        } else {
                            //console.log("Message sent: " + response.message);
                            res.status(200).json({ ok: "กรุณาตรวจสอบ Inbox อีเมล์ของคุณเพื่อยืนยันการลงทะเบียน" });
                        }

                        smtpTransport.close();
                    });

                    //res.json(result);
                }
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    verify(req, res) {
        var r = req.r;
        var params = req.query;
        var uid = params.uid;
        jwt.verify(uid, SECRET_KEY, function (err, user) {
            if (err) {
                res.status(500).json(err);
            } else {
                r.db('lms_erp').table('user').filter({ email: user.email.toLowerCase() }).coerceTo('array')
                    .do(function (result) {
                        return r.branch(result.count().eq(0),
                            r.expr(user).merge(function () {
                                return { password: sha1(user.password) }
                            }).do(function (all) {
                                return r.db('lms_erp').table('user').insert(all)
                            })
                            , { error: 'Duplicate Email' })
                    })
                    .run()
                    .then(function (result) {

                        if (result.error) {
                            res.status(500).json(result);
                        } else {
                            // res.json(result);
                            res.redirect("/login");
                        }
                    })
                    .catch(function (err) {
                        res.status(500).json(err);
                    })
            }

        });
        /* r.db('lms_erp').table('user').get(uid).update({ status: true })
             .run()
             .then(function (out) {
                 res.redirect("/login");
             })
             .catch(function (err) {
                 res.status(500).json(err);
             })*/

    }

    forgetPassword(req, res) {
        var r = req.r;
        var params = req.query;
        var email = params.email;
        r.db('lms_erp').table('user').filter({ email: email.toLowerCase() })
            .run()
            .then(function (users) {
                if (users.length > 0) {
                    //res.status(500).json({ error: "รหัสผ่านของคุณไม่ถูกต้อง", case: 2 });
                    var user = users[0];
                    user.status = false;
                    //user.password = sha1(user.emp_id);

                    r.db('lms_erp').table('user').get(user.id).update(user)
                        .run()
                        .then(function (out) {
                            var mailer = require("nodemailer");
                            var smtpTransport = mailer.createTransport({
                                service: "Gmail",
                                auth: {
                                    user: "quiz.btg@gmail.com",
                                    pass: "next@2017"
                                }
                            });
                            var pwd = jwt.sign({id:user.id}, SECRET_KEY, {
                                expiresIn: '30m'
                            });

                            var html = "<p>ชื่อผู้ใช้งาน : " + user.name + "</p>";
                            html += "<p>รหัสพนักงาน : " + user.emp_id + "</p>";
                            html += "<p>email/user : " + user.email + "</p>";
                            //  html += "<p>Password : " + user.emp_id + "</p>";
                            html += "<a href='https://quiz.nexts-corp.com/api/user/reset?pwd=" + pwd + "'>ตั้งค่ารหัสผ่านใหม่</a>";


                            var mail = {
                                from: "quiz service <quiz.btg@gmail.com>",
                                to: email,
                                subject: "ตั้งค่ารหัสผ่านใหม่",
                                // text: "Password : " + user.emp_id,
                                html: html
                                //html: "<b>Node.js New world for me</b>"
                            }

                            smtpTransport.sendMail(mail, function (error, response) {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json({ error: error });
                                } else {
                                    //console.log("Message sent: " + response.message);
                                    res.status(200).json({ ok: "ระบบได้ส่งรหัสผ่านใหม่ไปให้คุณแล้วทางอีเมล์ของคุณ" });
                                }

                                smtpTransport.close();
                            });

                        })



                } else {
                    res.status(500).json({ error: "ชื่อผู้ใช้งานไม่ถูกต้อง กรุณาลงทะเบียน", case: 1 });
                }
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }

    reset(req, res) {
        var r = req.r;
        var params = req.query;
        var pwd = params.pwd;
        res.cookie('token',pwd, {  maxAge: 1000 * 60 * 60 *24, httpOnly: true });
        res.redirect("/profile");
    }

}

module.exports = new index();