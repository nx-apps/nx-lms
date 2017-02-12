class index{

    upload_exam(req,res){
        var r = req.r;
        var params = req.body;
        var  XLSX = require('xlsx');
        var workbook = XLSX.readFile('D:/rethinkdb-2.3.5/excel/Workbook1.xlsx');

        var ch = [], allData=[], count=0;
        var sheet_name_list = workbook.SheetNames;
        
        sheet_name_list.forEach(function(y) { 
        var worksheet = workbook.Sheets[y];
        var i = 0;
            for (var z in worksheet){
                if(z[0] === '!') continue;
                if((worksheet[z].v === 'q') || (worksheet[z].v === 'ch1') || (worksheet[z].v === 'ch2') || (worksheet[z].v === 'ch3')|| 
                (worksheet[z].v === 'ch4') || (worksheet[z].v === 'ch5')) continue;
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

         var id="admin";
         r.expr(all).merge(function(x){
             return { time_insert:r.now(),user_id:id }
         }).do(function(xx){
             return r.db('lms').table('ex').insert(xx)
         })

        //r.db('lms').table('ex').insert(all)
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