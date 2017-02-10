var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var stream = require('stream');

class image {

    uploadImage(req, res) {

        var r = req.r;
        var params = req.params;

        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {

            var prefile = files.file[0];

            fs.readFile(prefile.path, function (err, data) {
                //console.log(r);
                r.db('lms').table('file').insert({
                    name: prefile.originalFilename,
                    type: prefile.headers['content-type'],
                    contents: data,
                    timestamp: new Date(),
                    ref_path:req.headers['ref-path']
                })
                    .run().then(function (result) {
                        res.json(result);
                    }).catch(function (err) {
                        res.json(err);
                    })
            });


            //res.json({ec:'01252'});
        });

    }

    downloadImage(req, res) {
        var r = req.r;
        var params = req.params;
        // console.log(params)

        r.db('lms').table('file').get(params.id)
            .run().then(function (result) {
                //console.log(result);
                res.writeHead(200, {
                    'Content-Type': result.type,
                    'Content-Length': result.contents.length,
                    'Content-Disposition':'filename='+result.name
                    //'Content-Disposition': 'attachment; filename=' + result.name
                });

                var bufferStream = new stream.PassThrough();
                bufferStream.end(result.contents);
                bufferStream.pipe(res);

            }).catch(function (err) {
                res.json(err);
            })

    }


}

module.exports = new image();