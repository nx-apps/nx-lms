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
const os = require('os');
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
        
        if(params.ref_index != 0 ){
            r.expr(params).merge(function () {
                return { correct: 0, incorrect: 0, time_insert: r.now() }
            }).do(function (result) {
                return r.db('lms').table('question').filter({ module:result('module'), ref_id:result('ref_id'), ref_index:result('ref_index')}).count()
                    .do(function(x){
                        return r.branch(x.eq(0),
                        r.db('lms').table('question').insert(result),
                        {error:'ERROR! CAN NOT INSERT'}
                        )
                })
            })
            .run()
            .then(function (result) {
                if(result.error){
                    res.status(500).json(result);
                }else{
                    res.json(result);
                }
                
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
        }else{
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

            auth.userInfo(req).then(user => {
                fmg.readFile(xx, prefile.originalFilename, user, function (result) {
                    if (result.error) {
                        res.status(500).json(result.error);
                    } else {
                        var questions = [];
                        for (var i = 0; i < result.length; i++) {
                            // r.db('lms').table('question').insert(result[i].questions).run().then(function (e) { });
                            questions = questions.concat(result[i].questions);
                        }
                        //console.log(questions);
                        r.db('lms').table('question').insert(questions).run().then(function (e) {
                            res.json(result);
                        });


                    }
                });
            }).catch(err => {
                res.status(500).json(err);
            })
        });

    }

    report_question(req, res) {
        var r = req.r;
        var params = req.query;

        r.db('lms').table('question').getAll(params.module, { index: 'module' }).pluck('correct', 'incorrect', 'question').merge(function (result) {
            return {
                d_tag: r.branch(result('correct').add(result('incorrect')).eq(0), 0,
                    result('correct').div(result('correct').add(result('incorrect'))).mul(100))
            }
        })

            .merge(function (result) {
                return {
                    d_index: r.branch(
                        result('d_tag').ge(1).and(result('d_tag').le(33)), 'ยาก',
                        result('d_tag').ge(34).and(result('d_tag').le(67)), 'ปานกลาง', 'ง่าย'
                    )
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


}

class FileManager {
    readFile(filename, name, user, callback) {
        console.log(filename);
        if (filename.indexOf(".xlsx") > 0) {
            console.log("start read .xlsx");
            var mod = name.replace(".xlsx", "")
            if (user.key_tags.indexOf(mod) > -1 || user.role == "admin") {
                this.readExcel(filename, mod, user, function (datas) {
                    //  console.log(JSON.stringify(datas));
                    callback([{ file: name, module: mod, submodule: mod, total: datas.length, questions: datas }]);
                });
            } else {
                callback({ error: "File Module ไม่ตรงกับของท่านกรุณาตรวจสอบ" });
            }

        }
        else if (filename.indexOf(".xls") > 0) {
            console.log("start read .xls");
            console.log("start read .xls");
            var mod = name.replace(".xls", "")
            if (user.key_tags.indexOf(mod) > -1 || user.role == "admin") {
                this.readExcel(filename, mod, user, function (datas) {
                    // console.log(JSON.stringify(datas));
                    callback([{ file: name, module: mod, submodule: mod, total: datas.length, questions: datas }]);
                });
            } else {
                callback({ error: "File Module ไม่ตรงกับของท่านกรุณาตรวจสอบ" });
            }
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
            if (user.key_tags.indexOf(mod) > -1 || user.role == "admin") {
                this.readCSV(filename, mod, submod, user, function (datas) {
                    //console.log(JSON.stringify(datas));
                    callback([{ file: name, module: mod, submodule: submod, total: datas.length, questions: datas }]);
                });
            } else {
                callback({ error: "File Module ไม่ตรงกับของท่านกรุณาตรวจสอบ" });
            }

        }
        else if (filename.indexOf(".zip") > 0) {
            console.log("start read .zip");
            var mod = name.replace(".zip", "");
            console.log(os.tmpdir());
            var full =os.tmpdir()+"/"+ mod + "_" + new Date().getTime();
            this.unzip(filename, full, function (data) {


                setTimeout(function () {
                    console.log("upziped");
                    fs.readdir(full, function (errx, files) {
                        console.log(files);
                        var q_list = [];
                        if (files.length > 0) {

                            async.each(files, function (f, next) {
                                var fmg = new FileManager();
                                fmg.readFile(full + "/" + f, f, user, function (result) {
                                    if (!result.error) {
                                        q_list.push(result[0]);
                                    }
                                    next();
                                });
                            }, function (e) {
                                callback(q_list);

                            });
                        } else {
                            callback({ error: "Not file" });
                        }
                    });
                }, 5000);
            });

        } else {
            callback({ error: "File Format ไม่ถูกต้อง [.csv,.xls,xlxs,.zip]" });
        }


    }
    unzip(filename, name, callback) {
        fs.createReadStream(filename)
            .pipe(unzip.Extract({ path: name }))
            .on('finish', function () {
                callback();
            });;
    }

    readCSV(filename, m, s, user, callback) {
        var q_list = [];
        var parser = parse({ delimiter: ',' }, function (err, data) {
            var ref_index = 1;
            var ref_id = "";
            async.eachSeries(data, function (line, next) {
                var data = {
                    "correct": 0,
                    "incorrect": 0,
                    "image_id": "",
                    "user_id": user.id,
                    "est": 1,
                    "ref_id": "",
                    "ref_index": 0,
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
                    "name": line[4],
                    "image_id": ""
                };
                data.choice.push(c);
                if (line[1].replace(" ", "")) {
                    data.est = line[1].replace(" ", "");
                }

                if (line[2].replace(" ", "")) {
                    data.dificalty_index = line[2].replace(" ", "");
                }

                if (line[3]) {
                    if (ref_id != line[3].replace(" ", "")) {
                        ref_index = 0;
                        ref_id = line[3].replace(" ", "");
                    }
                    ref_index++;
                    data.ref_id = line[3].replace(" ", "");
                    data.ref_index = ref_index;
                }

                var chk1 = line[4].replace(" ", "");
                var chk2 = "";

                for (var i = 5; i < line.length; i++) {
                    var c2 = {
                        "check": false,
                        "name": line[i],
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

    readExcel(filename, mod, user, callback) {
        var workbook = XLSX.readFile(filename);
        var q_list = [];
        async.each(workbook.SheetNames, function (sheet_name, next) {
            var sheet = workbook.Sheets[sheet_name];
            console.log(sheet_name);
            console.log("================================================");
            var index = 0;
            var data = {};
            var ref_index = 1;
            var ref_id = "";
            for (var key in sheet) {
                if (key !== '!ref') {
                    if (key[0] === 'A') {
                        if (index > 0) {
                            q_list.push(data);
                        }
                        data = {
                            "question": sheet[key].v,
                            "est": 1,
                            "dificalty_index": 1,
                            "ref_index": 0,
                            "ref_id": "",
                            "choice": [],
                            "module": mod,
                            "tags": [
                                sheet_name
                            ],
                            "correct": 0,
                            "incorrect": 0,
                            "image_id": "",
                            "user_id": user.id,
                        };
                        index++;
                    } else if (key[0] === 'B') {
                        if (sheet[key].v) {
                            data.est = sheet[key].v
                        }
                    }
                    else if (key[0] === 'C') {
                        if (sheet[key].v) {
                            data.dificalty_index = sheet[key].v
                        }
                    }
                    else if (key[0] === 'D') {
                        if (sheet[key].v) {
                            if (ref_id != sheet[key].v) {
                                ref_index = 0;
                                ref_id = sheet[key].v;
                            }
                            ref_index++;
                            data.ref_id = sheet[key].v
                            data.ref_index = ref_index;
                        }
                    }
                    else if (key[0] === 'E') {
                        if (sheet[key].v) {
                            var c = {
                                "check": true,
                                "name": String(sheet[key].v),
                                "image_id": ""
                            };
                            data.choice.push(c);
                        }
                    } else {
                        if (sheet[key].v) {
                            var c = {
                                "check": false,
                                "name": String(sheet[key].v),
                                "image_id": ""
                            };
                            data.choice.push(c);
                        }
                    }
                }
            }
            if (data.question && data.choice.length >= 2) {
                q_list.push(data);
            }

            next();
        }, function (e) {
            callback(q_list);
        });
    }

    readImages(filename) {

    }

}

module.exports = new index();