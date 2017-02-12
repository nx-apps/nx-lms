class index{

    upload_exam(req,res){
        var r = req.r;
        var params = req.body;
        var  XLSX = require('xlsx');
        var workbook = XLSX.readFile('C:/Users/ASUS/AppData/Local/Temp/XoG3nfxMhU5Fo5iUS3_VuYGc.xlsx');

        var ch = [], allData=[], count=0;
        var sheet_name_list = workbook.SheetNames;
        
        sheet_name_list.forEach(function(y) { 
        var worksheet = workbook.Sheets[y];
        var i = 0;
            for (var z in worksheet){
                if(z[0] === '!') continue;
                if((worksheet[z].v === 'q') || (worksheet[z].v === 'ch1') || (worksheet[z].v === 'ch2') || (worksheet[z].v === 'ch3')|| (worksheet[z].v === 'ch4')) continue;
                ch[i] = worksheet[z].v; i++;
            }
            allData[count] = ch; count++; ch = [];
        });

        var all = [];
        var data = {topic:"",choice:[],answer:0};
        allData.map((row,i)=>{
            row.map(function(row2,i2){
                if(i2==0){
                    data.topic = row2;
                }else{
                    data.choice.push(
                        {
                            checked: false,
                            chice:row2,
                            image_id:""
                        }
                    )
                }
            })
            all.push(data);
            data = {topic:"",choice:[],answer:0};
        })

        r.db('lms').table('ex').insert(all)
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