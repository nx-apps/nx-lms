class index{

    send_answer(req,res){
        var r = req.r;
        var params = req.body;

        r.expr(params)
 /*
        .merge(function(x){
        return {
            count_question:x('question').count(),
            score:x('question')('choice').count(function(sc){
                return r.branch( sc.filter({ check:true,answer:true }).count().eq(0), false, true )
            })
            }
        })
        .do(function(result){
            return r.db('lms').table('exam_answer').insert(result)
        })
*/
/*
        .merge(function(xxx){
            return { 
                x:xxx('question').merge(function(m){
                    return {
                        choiceQuiz : r.db('lms').table('question').get(m('id')).getField('choice')
                    }
                })
                .merge(function(m){
                    return {
                        aquizTrue : m('choiceQuiz').filter(function(ff){
                            return ff('check').eq(true)
                        })(0),
                        ansTrue:m('choice').filter(function(ff){
                            return ff('answer').eq(true)
                        })(0)
                    }
                })
                .merge(function(m){
                    return {
                        ascore : r.branch(m('aquizTrue')('name').eq(m('ansTrue')('name')),1,0),
                        aXscore : r.branch(m('aquizTrue')('name').ne(m('ansTrue')('name')),1,0)
                    }
                })
                .group(function(g){
                    return g.pluck('id','ascore','aXscore')
                })
                .ungroup()
                .map(function(mm){
                    return mm('group')
                })
            }
        })
    
            .merge(function(a){
                return { score:a('x').sum('ascore'),count_question:a('question').count()  }
            }) .without('x')
            .do(function(result){
                return r.db('lms').table('exam_answer').insert(result)
            })
            .do(function(aa){
                return r.db('lms').table('exam_answer').filter({id:aa('generated_keys')(0)})
            })
        
            .merge(function(xxx){
                return xxx('question')
                    .merge(function(m){
                return {
                    choiceQuiz : r.db('lms').table('question').get(m('id')).getField('choice')
                }
            })
            .merge(function(m){
                return {
                    aquizTrue : m('choiceQuiz').filter(function(ff){
                        return ff('check').eq(true)
                    })(0),
                        ansTrue:m('choice').filter(function(ff){
                            return ff('answer').eq(true)
                    })(0)
                }
            })
            .merge(function(m){
                return {
                    ascore : r.branch(m('aquizTrue')('name').eq(m('ansTrue')('name')),1,0),
                    aXscore : r.branch(m('aquizTrue')('name').ne(m('ansTrue')('name')),1,0)
                }
            })
            .group(function(g){
                return g.pluck('id','ascore','aXscore')
            })
            .ungroup()
            .map(function(mm){
                return mm('group')
            })
        
            .forEach(function(ff){
                return r.db('lms').table('question').get(ff('id'))
                .do(function(dooo){
                    return r.db('lms').table('question').get(ff('id')).update({
                        correct:dooo('correct').add(ff('ascore')),
                        incorrect:dooo('incorrect').add(ff('aXscore'))
                    })
                })
            })            
        })
*/
        .merge(function(x){
            return {
            question:x('question')
            .merge(function(x){
                return {a:x('choice').filter({answer:true})}
            }) 
                .merge(function(x){
                //return {q:r.db('lms').table('question').get(x('id')).getField('choice').filter({check:true})(0) }
                return { a: r.branch( x('choice').filter({answer:true}).isEmpty().eq(true), {name:''} , x('choice').filter({answer:true})(0) ) }
            })
            
            .merge(function(x){
                return { 
                Cscore: r.branch(x('a')('name').eq(x('q')('name')),1,0),
                ICscore: r.branch(x('a')('name').ne(x('q')('name')),1,0),
                choice:x('choice').merge(function(xx){ return {answer_correct:x('q')('name') } }) 
                }
            }),
            examination_id:x('examination_id'),
            exam_room_id:x('exam_room_id'),
            count_question:x('question')('choice').count(),
            user_id:x('user_id'),
            time_insert:r.now()
            }
        })
        .do(function(x){
            return x.merge(function(x){
            return {score:x('question')('Cscore').sum()}
            })
        })
        .do(function(result){return r.db('lms').table('exam_answer').insert(result)})
        .do(function(aa){return r.db('lms').table('exam_answer').filter({id:aa('generated_keys')(0)})})
        
        .merge(function(x){
            return x('question')
        })

        .group(function(x){
            return x.pluck('id','Cscore','ICscore')
        }).ungroup()

        .map(function(x){
            return x('group')
        })(0)

        .forEach(function(x){
            return r.db('lms').table('question').get(x('id'))
            .do(function(doo){
                return r.db('lms').table('question').get(x('id'))
                .update({
                    correct:doo('correct').add(x('Cscore')),
                    incorrect:doo('incorrect').add(x('ICscore')),
                    d_tag:r.branch(doo('correct').add(doo('incorrect')).eq(0),0,
                    doo('correct').add(x('Cscore')) .div( doo('correct').add(x('Cscore')) .add( doo('incorrect').add(x('ICscore')) )).mul(100))
                })
            })
        })

        .run()
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        })
        
    }

    show_answer(req,res){
        var r = req.r;
        var params = req.query;
         r.db('lms').table('exam_answer').filter({
        user_id:params.user_id,
        exam_room_id:params.exam_room_id
        })
        .innerJoin(r.db('lms').table('user'),function(x,xx){
            return x('user_id').eq(xx('id'))
        }).map(function(n){
            return n('left').merge(function(){
            return {name:n('right')('name')}
            })
        })
        
        .innerJoin(r.db('lms').table('examination'),function(x,xx){
            return x('examination_id').eq(xx('id'))
        }).map(function(n){
            return n('left').merge(function(){
            return {time:n('right')('time'),description:n('right')('description'),name_examination:n('right')('name_examination')}
            })
        })
        .pluck('name','score','time','name_examination','description','question')(0)
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