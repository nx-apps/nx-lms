var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var stream = require('stream');


class index{

    select_question(req,res){
        var r = req.r;
        var params = req.query;
        
        r.db('lms').table('question').getAll(params.module, {index:'module'}).orderBy('time_insert').pluck('id','question','module')
        .merge(function(x){
            return {
            module:[x('module')].map(function(fc){ return r.db('lms').table('tag').get(fc) })
            }
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    select_question_only(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('question').get(params.id)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
        
    }

    select_sub(req,res){
        var r = req.r;
        var params = req.query;
        
        r.db('lms').table('question').filter({module:params.module}).concatMap(function(tags){
            return tags('tags')
        }).distinct()
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    insert_question(req,res){
        var r = req.r;
        var params = req.body;

        r.expr(params).merge(function(){
            return {correct:0, incorrect:0, time_insert:r.now() }
        }).do(function(result){
            return r.db('lms').table('question').insert(result)
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    update_question(req,res){
        var r = req.r;
        var params = req.body;

        r.db('lms').table('question').get(params.id).update(params)
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    delete_question(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('question').get(params.id).delete()
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }

    uploadFile(req,res){
        var r = req.r;
        var params = req.params;

        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {

            var prefile = files.file[0];
            var x = prefile.path;
            var xx =  x.replace(/\\/g,"/");

            //Read file here.
            var  XLSX = require('xlsx');
            var workbook = XLSX.readFile(xx);

            const tagConvert = (sheet)=>{
                var index = 0;
                for(var i=0;i<sheet.length;i++){
                    index = i;
                    if(!isNaN(sheet[i])) break;
                }

                return ["*"+sheet.slice(0,index),sheet.slice(0,sheet.length)]
            }

            var data = workbook.Sheets;
            let preData = [];
            let mainIndex = -1;
            for (var sheet in data) {
                for (var key in data[sheet]) {
                    
                    if (key !== '!ref') {
                        if (key[0] === 'A') {
                            mainIndex++;
                            preData[mainIndex] = {
                                topic:data[sheet][key].v,
                                tag:tagConvert(sheet),
                                answer:0,
                                choice:[]

                            };
                            var index = 0;
                        }else{
                            var choice = {checked: false,image_id:""};
                            if(index===0) choice.checked = true;
                            index++;
                            choice.choice = data[sheet][key].v;
                            preData[mainIndex].choice.push(choice);
                        }
                    }
                }
            }

            preData = preData.filter(function(row){
                return (row.topic==='q')?false:true
            })

            res.json(preData);

            r.expr(preData).merge(function(row){
                return { 
                    time_insert:r.now(),user_id:fields.user_id[0]
                }
            })
            .do(function(result){
                return r.db('lms').table('question').insert(result)
            })
            .run()  
            .then(function(result){
                res.json(result);
            })
            .catch(function(err){
                res.status(500).json(err);
            })


        });
        
    }

    report_question(req,res){
        var r = req.r;
        var params = req.query;

        r.db('lms').table('question').getAll(params.module,{index:'module'}).pluck('correct','incorrect','question').merge(function(result){
            return {
                d_tag: r.branch( result('correct').add(result('incorrect')).eq(0),0, 
                result('correct').div( result('correct').add(result('incorrect')) ).mul(100)  )
            }
        })

        .merge(function(result){
            return {
            d_index:r.branch(
                result('d_tag').ge(0).and( result('d_tag').le(33) ),'ยาก',
                result('d_tag').ge(34).and( result('d_tag').le(67) ),'ปานกลาง','ง่าย'
            )
            }
        })
        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
    }
}

module.exports = new index();