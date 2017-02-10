const jwt = require('jsonwebtoken');
const sha1 = require('js-sha1');
const SECRET_KEY = "จริงๆแล้วก็ไม่รู้ว่าจะใส่อะไรดีที่เป็นความลับอะนะ";

class auth{
    login(req,res){
        var r = req.r;
        var params = req.body;
        params.password = sha1(params.password);

        r.db('lms').table('user').filter({username:params.username,password:params.password})
        .coerceTo('array')(0).pluck('username','role','name')
        .run()
        .then((result)=>{
            var token = jwt.sign(result,SECRET_KEY,{
                expiresIn:'1 days'
            });
            res.json({token:token});
        })
        .catch((err)=>{
            res.status(500).json(err);
        })

    }
}

module.exports = new auth();