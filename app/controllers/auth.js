const jwt = require('jsonwebtoken');
const SECRET_KEY = "จริงๆแล้วก็ไม่รู้ว่าจะใส่อะไรดีที่เป็นความลับอะนะ";

exports.userInfo = function(req){
    return new Promise(function(resolve,reject){
        if(req.headers.token){
            //return req.headers.token;
            jwt.verify(req.headers.token,SECRET_KEY,function(err,decode){
                
                if(err){
                    reject({error:'wrong token'});
                }else{
                    resolve(decode);
                    
                }
            });
        }else{
            reject({error:'no token'});
        }
    })
    
    
}