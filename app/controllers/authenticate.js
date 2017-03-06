const jwt = require('jsonwebtoken');
const SECRET_KEY = "จริงๆแล้วก็ไม่รู้ว่าจะใส่อะไรดีที่เป็นความลับอะนะ";

function parseCookies(req) {
    var list = {},
        rc = req.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

module.exports = function (options) {
    options = options || ["*"];
    return function authenticate(req, res, next) {
        var cookies = parseCookies(req);
        //  console.log(cookies);
        if (cookies.token) {
            jwt.verify(cookies.token, SECRET_KEY, function (err, decode) {

                if (err) {
                    //reject({ error: 'wrong token' });
                    res.status(401).send("Unauthorized");
                } else {
                    // resolve(decode);
                    //for(var i=0;i<options.length;i++){
                    //  if(options)
                    // }
                    // console.log(decode);
                    //user
                    //admin
                    //key
                    //  key_tags
                    //  end_tags
                    // if()


                    r.db('lms').table('user').filter({ id: decode.id })
                        .merge(function (row) {
                            return {
                                role: r.branch(row('admin').eq(true), 'admin',
                                    r.branch(row('key_tags').count().eq(0), 'learner', 'teacher')
                                )
                            }
                        })
                        .coerceTo('array')(0).pluck('username', 'email', 'emp_id', 'name', 'id', 'role', 'end_tags', 'key_tags', 'status')
                        .run()
                        .then((result) => {

                            var role = "user";
                            if (result.role == "admin") {
                                role = "admin"
                            } else if (result.role == "teacher") {
                                role = "key";
                            }
                            console.log(role);

                            if (options.includes("*") || options.includes(role)) {
                                //  req.user = decode;

                                //var token = jwt.sign(result, SECRET_KEY, {
                                //    expiresIn: '1 days'
                                // });
                                // res.json({ token: token });
                                req.user = result;

                                next();

                                // next();
                            } else {
                                res.status(403).send("Access Denied");
                            }

                        })
                        .catch((err) => {
                            res.status(500).json(err);
                        })
                    // console.log(decode);
                    // req.user = decode;
                    // next();

                }
            });
        } else {
            // reject({ error: 'no token' });
            res.status(401).send("Unauthorized");
        }
    }

}

/*
exports.Authentication = function (req, res, next) {
    var cookies = parseCookies(req);
    console.log(cookies);
    if (cookies.token) {
        jwt.verify(cookies.token, SECRET_KEY, function (err, decode) {

            if (err) {
                //reject({ error: 'wrong token' });
                res.error(401).send("UnAuthentication");
            } else {
                // resolve(decode);
                req.user = decode;
                next();

            }
        });
    } else {
        // reject({ error: 'no token' });
        res.error(401).send("UnAuthentication");
    }
}*/

/*
exports.userInfo = function (req) {
    return new Promise(function (resolve, reject) {
        if (req.headers.token) {
            //return req.headers.token;
            jwt.verify(req.headers.token, SECRET_KEY, function (err, decode) {

                if (err) {
                    reject({ error: 'wrong token' });
                } else {
                    resolve(decode);

                }
            });
        } else {
            var cookies = parseCookies(req);
            console.log(cookies);
            if (cookies.token) {
                jwt.verify(cookies.token, SECRET_KEY, function (err, decode) {

                    if (err) {
                        reject({ error: 'wrong token' });
                    } else {
                        resolve(decode);

                    }
                });
            } else {
                reject({ error: 'no token' });
            }

        }
    })


}*/