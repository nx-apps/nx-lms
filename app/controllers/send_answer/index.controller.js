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
        examination_id:params.examination_id
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