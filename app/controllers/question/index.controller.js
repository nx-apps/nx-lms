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

            //Read file here.
            console.log(prefile.path);
            res.json({test:'okok'});

        });
    }

}
module.exports = new index();