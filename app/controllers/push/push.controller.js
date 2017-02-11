const fs = require('fs')

const importList = require('./import');
const importHTML = fs.readFileSync('./public/src/import2.html');

const pushy = (req,res,list)=>{

    list.map((row)=>{
        var contentType;
        switch (row.type) {
            case "html":
                contentType = "text/html";
                break;
            case "js":
                contentType = "application/javascript";
        }
        
        const importFile = fs.readFileSync('./public/'+row.path);

        res.push(row.path, 
            {
                status: 200,
                method: 'GET',
                request: {
                    accept: '*/*'
                },
                response: {
                    'content-type':contentType
                }
            }
            ,
            function(err, stream){
                if (err) return;
                stream.end(importFile);
            }
        )
    })

}

class pusha{
    import(req,res){
        
        pushy(req,res,importList);
        res.end(importHTML)
        //res.json(importList);
    }
}
module.exports = new pusha();