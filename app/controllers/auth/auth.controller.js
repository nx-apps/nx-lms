const jwt = require('jsonwebtoken');
const sha1 = require('js-sha1');
const SECRET_KEY = "จริงๆแล้วก็ไม่รู้ว่าจะใส่อะไรดีที่เป็นความลับอะนะ";

class auth{
    login(req,res){
        var r = req.r;
        var params = req.body;
        params.password = sha1(params.password);

        r.db('lms').table('user').filter({email:params.username,password:params.password})
        .coerceTo('array')(0).pluck('username','name','id')
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
    
    checkToken(req,res){
        if(req.body.token){
            jwt.verify(req.body.token,SECRET_KEY,function(err,decode){
                if(err){
                    res.status(401).json(err);
                }else{
                    res.json(decode);
                }
            });
        }else{
            res.status(401).json({error:'Unauthorized'});
        }
    }
    
}

module.exports = new auth();