var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var stream = require('stream');


class index{

    select_question(req,res){
        var r = req.r;
        var params = req.params;

        //r.db('lms').table('question').orderBy(r.desc('time_insert'))
        r.db('lms').table('question').orderBy('time_insert')
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

    insert_question(req,res){
        var r = req.r;
        var params = req.body;

        //r.db('lms').table('question').insert(params)
        r.db('lms').table('question').insert({
            answer:params.answer,
            choice:params.choice,
            tag:params.tag,
            topic:params.topic,
            user_id:params.user_id,
            image_id:params.image_id,
            time_insert:r.now()
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

            var allData=[], count_name=0, count_round=0;
            var sheet_name_list = workbook.SheetNames;
            
            sheet_name_list.forEach(function(y) { 
            var worksheet = workbook.Sheets[y];
            var i=0, ch=[];
            
                for (var z in worksheet){  //sheets round
                    if(z[0] === '!') continue;
                    if((worksheet[z].v === 'q') || (worksheet[z].v === 'ch1') || (worksheet[z].v === 'ch2') || (worksheet[z].v === 'ch3')|| 
                    (worksheet[z].v === 'ch4') || (worksheet[z].v === 'ch5')) continue;

                    if(i <= 5){
                        ch[i] = worksheet[z].v; 
                        if(i==5){
                            ch[i+1] = sheet_name_list[count_name];
                            allData[count_round] = ch;
                            ch=[]; i=-1; count_round++;
                        }
                        i++;
                    }

                }
                count_name++;
            });
            //console.log(allData);
            var getLength = allData[0].length-1; // check exam
            var all=[], data = {topic:"",choice:[],answer:0,tag:[]};

            allData.map((row,i)=>{
            row.map(function(row2,i2){
                if(i2==0){
                    data.topic = row2;
                }else if(i2 != getLength){
                    if(i2==1){
                        data.choice.push(
                            {
                                checked: true,
                                chice:row2,
                                image_id:""
                            }
                        )
                    }else{
                        data.choice.push(
                            {
                                checked: false,
                                chice:row2,
                                image_id:""
                            }
                        )
                    }
                }
                else{
                    data.tag.push(row2);
                }
            })
                all.push(data);
                data = {topic:"",choice:[],answer:0,tag:[]};
            })
/*
            var ch = [], allData=[], count=0;
            var sheet_name_list = workbook.SheetNames;
            
            sheet_name_list.forEach(function(y) { 
            var worksheet = workbook.Sheets[y];
            var i = 0;
                for (var z in worksheet){
                    if(z[0] === '!') continue;
                    if((worksheet[z].v === 'q') || (worksheet[z].v === 'ch1') || (worksheet[z].v === 'ch2') || 
                    (worksheet[z].v === 'ch3') || (worksheet[z].v === 'ch4') || (worksheet[z].v === 'ch5')) continue;
                    
                    ch[i] = worksheet[z].v; i++;
                }
                ch[i] = sheet_name_list[count];
                allData[count] = ch; count++; ch = [];
            });

            var getLength = allData[0].length-1; // check exam
            var all = [];
            var data = {topic:"",choice:[],answer:0,tag:[]};
            allData.map((row,i)=>{
            row.map(function(row2,i2){
                if(i2==0){
                    data.topic = row2;
                }else if(i2 != getLength){
                    if(i2==1){
                        data.choice.push(
                            {
                                checked: true,
                                chice:row2,
                                image_id:""
                            }
                        )
                    }else{
                        data.choice.push(
                            {
                                checked: false,
                                chice:row2,
                                image_id:""
                            }
                        )
                    }
                }
                else{
                    data.tag.push(row2);
                }
            })
                all.push(data);
                data = {topic:"",choice:[],answer:0,tag:[]};
            })
*/
            r.expr(all).merge(function(x){
                return { time_insert:r.now(),user_id:fields.user_id[0] }
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

        });
        
    }

}
module.exports = new index();