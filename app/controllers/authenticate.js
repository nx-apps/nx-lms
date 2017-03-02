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

module.exports = function () {

    return function authenticate(req, res, next) {
        var cookies = parseCookies(req);
        console.log(cookies);
        if (cookies.token) {
            jwt.verify(cookies.token, SECRET_KEY, function (err, decode) {

                if (err) {
                    //reject({ error: 'wrong token' });
                    res.status(401).send("Unauthorized");
                } else {
                    // resolve(decode);
                    req.user = decode;
                    next();

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