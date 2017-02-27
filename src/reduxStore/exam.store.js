import axios from '../axios'
import {commonAction} from '../config'
import Cookies from 'js-cookie'

const initialState = {
   examResult:{}
}

export function examReducer(state = initialState,action){
    switch ('EXAM_GET_DATA_LIST') {
        case 'EXAM_GET_DATA_LIST':
            return Object.assign({},state,{examResult:action.payload});
        default:
            break;
    }
}

export function examAction(store){
    return [
        commonAction(),{
            EXAM_INSERT_DATA:function(data){
                console.log(JSON.stringify(data));
                data.user_id = store.getState().auth.user.id;
              
                this.fire('toast',{status:'load'});
                axios.post('./send_answer/send_answer',data)
                .then((response)=>{
                    this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                        callback:()=>{
                            // this.stat = false;
                            // console.log(response.data);
                        }
                     });
                    
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAM_COUNTDOWN:function(){

                

                if(typeof this.dataList.time != "undefined"){
                    console.log(this.dataList);
                    //Cookies.set('cc', 'value', { expires: 1 });
                    //
                    if(x){
                        clearInterval(x);
                    }

                    var time = this.dataList.time;

                    if(!Cookies.get(this.dataList.exam_room_id)){
                        Cookies.set(this.dataList.exam_room_id, new Date().getTime()+(time*60000), { expires: 1 });
                    }

                    var countDownDate = Cookies.get(this.dataList.exam_room_id);

                    const transform=(digi)=>{
                        if(digi<10){
                            return "0"+digi
                        }else{
                            return digi
                        }
                    }
                    
                    var x = setInterval(()=>{
                        
                        var now = new Date().getTime();
                        var distance = countDownDate - now;
                        
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                        this.countDown = `${transform(hours)}:${transform(minutes)}:${transform(seconds)}`
                        if (distance < 0) {
                            clearInterval(x);
                            this.countDown = "หมดเวลา";
                            Cookies.remove(this.dataList.exam_room_id);
                            this.sendAnswer(true);
                        }
                    }, 1000);
                    
                }
            }
        }
    ]
}