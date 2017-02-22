var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var stream = require('stream');
var parse = require('csv-parse');
var async = require('async');
var iconv = require('iconv-lite');
var XLSX = require('xlsx');
var unzip = require('unzip');
const auth = require('../auth');

class index {

    select_question(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('question').getAll(params.module, { index: 'module' }).orderBy('time_insert').pluck('id', 'question', 'module')
            .merge(function (x) {
                return {
                    module: [x('module')].map(function (fc) { return r.db('lms').table('tag').get(fc) })
                }
            })
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    select_question_only(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('question').get(params.id)
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })

    }

    select_sub(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('question').filter({ module: params.module }).concatMap(function (tags) {
            return tags('tags')
        }).distinct()
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    insert_question(req, res) {
        var r = req.r;
        var params = req.body;

        r.expr(params).merge(function () {
            return { correct: 0, incorrect: 0, time_insert: r.now() }
        }).do(function (result) {
            return r.db('lms').table('question').insert(result)
        })
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    update_question(req, res) {
        var r = req.r;
        var params = req.body;

        r.db('lms').table('question').get(params.id).update(params)
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    delete_question(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('question').get(params.id).delete()
            .run()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    }

    uploadFile(req, res) {
        var r = req.r;
        var params = req.params;

        var form = new multiparty.Form();
        var fmg = new FileManager();

        form.parse(req, function (err, fields, files) {

            var prefile = files.file[0];
            var x = prefile.path;
            var xx = x.replace(/\\/g, "/");
            //console.log(prefile);
            //fmg.unzip(xx);
           // ***************
                auth.userInfo(req).then(user => {
                    console.log(user.role);
                }).catch(err => {
                    res.json(err);
                })
            fmg.readFile(xx, prefile.originalFilename, function (result) {
                res.json(result);
            });

            /*

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
            })*/


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

class FileManager {
    readFile(filename, name, callback) {
        console.log(filename);
        if (filename.indexOf(".xlsx") > 0) {
            console.log("start read .xlsx");
            var mod = name.replace(".xlsx", "")
            this.readExcel(filename, mod, function (datas) {
                console.log(JSON.stringify(datas));
                callback();
            });
        }
        else if (filename.indexOf(".xls") > 0) {
            console.log("start read .xls");
            console.log("start read .xls");
            var mod = name.replace(".xls", "")
            this.readExcel(filename, mod, function (datas) {
                console.log(JSON.stringify(datas));
                callback();
            });
        }
        else if (filename.indexOf(".csv") > 0) {
            console.log("start read .csv");
            var submod = name.replace(".csv", "")
            var mod = ""
            for (var i = 0; i < submod.length; i++) {
                try {
                    var x = parseInt(submod.charAt(i));
                    if (isNaN(x)) {
                        mod = mod + submod[i];
                    } else {
                        break;
                    }
                } catch (e) {
                }
            }
            this.readCSV(filename, mod, submod, function (datas) {
                console.log(JSON.stringify(datas));
                callback();
            });

        }
        else if (filename.indexOf(".zip") > 0) {
            console.log("start read .zip");
            var mod = name.replace(".zip", "") + "_" + new Date().getTime();
            this.unzip(filename, mod, function (data) {
                console.log(process.cwd() + '/temp/' + mod);
                while (true) {
                    fs.readdir(process.cwd() + '/temp/' + mod, function (err, files) {
                        console.log(err);
                        if (!err) {

                            callback();

                        }

                    });
                }



            });


        } else {
            callback({ result: "file format incorrect" });
        }


    }
    unzip(filename, name, callback) {
        console.log(filename);
        var zlib = require('zlib');
        fs.createReadStream(filename)
            .pipe(unzip.Extract({ path: process.cwd() + '/temp/' + name }))
            .on('finish', function () {

                callback();
            });


    }

    readCSV(filename, m, s, callback) {
        var q_list = [];
        var parser = parse({ delimiter: ',' }, function (err, data) {

            async.eachSeries(data, function (line, next) {
                var data = {
                    "correct": 0,
                    "incorrect": 0,
                    "image_id": "",
                    "user_id": "",
                    "est": 0,
                    "ref": "",
                    "choice": [
                    ],
                    "module": m,
                    "tags": [
                        s
                    ],
                    "question": line[0],
                    "correct": 0,
                    "dificalty_index": 1,
                };
                var c = {
                    "check": true,
                    "name": line[1],
                    "image_id": ""
                };
                data.choice.push(c);
                var chk1 = line[1].replace(" ", "");
                var chk2 = "";
                for (var i = 2; i < line.length; i++) {
                    var c2 = {
                        "checked": false,
                        "choice": line[i],
                        "image_id": ""
                    };
                    chk2 = line[i].replace(" ", "");
                    if (chk1 != chk2 && chk2 != "") {
                        data.choice.push(c2);
                    }
                }
                if (line[0].replace(" ", "") != "" && chk1 != "" && chk2 != "") {
                    q_list.push(data);
                }
                next();
            }, function (errr) {
                callback(q_list);
            });
        });

        fs.createReadStream(filename).pipe(iconv.decodeStream('win874')).pipe(iconv.encodeStream('utf8')).pipe(parser);

    }

    readExcel(filename, mod, callback) {
        var workbook = XLSX.readFile(filename);

        /* const tagConvert = (sheet) => {
             var index = 0;
             for (var i = 0; i < sheet.length; i++) {
                 index = i;
                 if (!isNaN(sheet[i])) break;
             }
             return ["*" + sheet.slice(0, index), sheet.slice(0, sheet.length)]
         }*/

        //  var datas = workbook.Sheets;
        // let preData = [];
        // let mainIndex = -1;
        var q_list = [];
        //  var sheet_name_list = workbook.SheetNames;
        async.each(workbook.SheetNames, function (sheet_name, next) {
            //for (var key in sheet) {
            // console.log(sheet);
            var sheet = workbook.Sheets[sheet_name];
            console.log(sheet_name);
            console.log("================================================");
            var index = 0;
            var data = {};
            for (var key in sheet) {
                if (key !== '!ref') {
                    if (key[0] === 'A') {
                        if (index > 0) {
                            q_list.push(data);
                        }
                        data = {
                            "correct": 0,
                            "incorrect": 0,
                            "image_id": "",
                            "user_id": "",
                            "choice": [],
                            "module": mod,
                            "tags": [
                                sheet_name
                            ],
                            "est": 0,
                            "ref": "",
                            "question": sheet[key].v,
                            "correct": 0,
                            "dificalty_index": 1,
                        };
                        index++;
                    } else if (key[0] === 'B') {
                        data.est = sheet[key].v
                    }
                    else if (key[0] === 'C') {
                        data.dificalty_index = sheet[key].v
                    }
                    else if (key[0] === 'D') {
                        data.ref = sheet[key].v
                    }
                    else if (key[0] === 'E') {
                        var c = {
                            "check": true,
                            "name": sheet[key].v,
                            "image_id": ""
                        };
                        data.choice.push(c);
                    } else {
                        var c = {
                            "check": false,
                            "name": sheet[key].v,
                            "image_id": ""
                        };
                        data.choice.push(c);
                    }
                }
            }
            q_list.push(data);
            next();
        }, function (e) {
            callback(q_list);
        });

        /*  for (var sheet in data) {
              for (var key in data[sheet]) {
  
                  if (key !== '!ref') {
                      if (key[0] === 'A') {
                          mainIndex++;
                          preData[mainIndex] = {
                              topic: data[sheet][key].v,
                              tag: tagConvert(sheet),
                              answer: 0,
                              choice: []
  
                          };
                          var index = 0;
                      } else {
                          var choice = { checked: false, image_id: "" };
                          if (index === 0) choice.checked = true;
                          index++;
                          choice.choice = data[sheet][key].v;
                          preData[mainIndex].choice.push(choice);
                      }
                  }
              }
          }
  
          preData = preData.filter(function (row) {
              return (row.topic === 'q') ? false : true
          })*/

        // res.json(preData);

        //  r.expr(preData).merge(function (row) {
        //   return {
        //     time_insert: r.now(), user_id: fields.user_id[0]
        // }
        ///  })
        //  .do(function (result) {
        //return r.db('lms').table('question').insert(result)
        //  })
        //  .run()
        //  .then(function (result) {
        //  res.json(result);
        // })
        //.catch(function (err) {
        // res.status(500).json(err);
        // })
    }

    readImages(filename) {

    }

}

module.exports = new index();