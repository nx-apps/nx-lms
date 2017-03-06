const jwt = require('jsonwebtoken');
const sha1 = require('js-sha1');
const SECRET_KEY = "จริงๆแล้วก็ไม่รู้ว่าจะใส่อะไรดีที่เป็นความลับอะนะ";


// const auth = require('../auth');
// select_exam(req,res){
//     var r = req.r;
//     var params = req.query;

//     auth.userInfo(req).then(user=>{
//         res.json(user);
//     }).catch(err=>{
//         res.json(err);
//     })

// }


class auth {



    login(req, res) {
        var r = req.r;
        var params = req.body;
        params.password = sha1(params.password);

        r.db('lms').table('user').filter({ email: params.username.toLowerCase(), password: params.password })
            .merge(function (row) {
                return {
                    role: r.branch(row('admin').eq(true), 'admin',
                        r.branch(row('key_tags').count().eq(0), 'learner', 'teacher')
                    )
                }
            })
            .coerceTo('array')(0).pluck('username', 'name', 'id', 'role', 'end_tags', 'key_tags', 'status')
            .run()
            .then((result) => {
                var token = jwt.sign(result, SECRET_KEY, {
                    expiresIn: '1 days'
                });
                res.json({ token: token });
            })
            .catch((err) => {

                r.db('lms').table('user').filter({ email: params.username.toLowerCase() })
                    .count()
                    .run()
                    .then(function (out) {
                        if (out > 0) {
                            res.status(500).json({error:"รหัสผ่านของคุณไม่ถูกต้อง",case:2});
                        } else {
                            res.status(500).json({error:"ชื่อผู้ใช้งานไม่ถูกต้อง กรุณาลงทะเบียน",case:1});
                        }
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    });


            })

    }

    checkToken(req, res) {
        res.json(req.user);

        /*  if (req.body.token) {
              jwt.verify(req.body.token, SECRET_KEY, function (err, decode) {
                  if (err) {
                      res.status(401).json(err);
                  } else {
                      res.json(decode);
                  }
              });
          } else {
              res.status(401).json({ error: 'Unauthorized' });
          }*/
    }

    sha1(req, res) {
        var password = req.query.password;
        var data = sha1(password);
        res.send(data);
    }

}

module.exports = new auth();