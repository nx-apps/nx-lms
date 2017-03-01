import axios from '../axios'
import {commonAction} from '../config'
// import Cookies from 'js-cookie'

const initialState = {
   examResult:{},
   dataSelect:{}
}

export function examReducer(state = initialState,action){
    switch(action.type) {
        case 'EXAM_GET_DATA_LIST':
            return Object.assign({},state,{examResult:action.payload});
        case 'EXAM_GET_DATA':
            return Object.assign({},state,{dataSelect:action.payload});
        default:
            return state;
    }
}

export function examAction(store){
    return [
        commonAction(),{
            EXAM_INSERT_DATA:function(data){
                console.log(JSON.stringify(data));
                // data.user_id = store.getState().auth.user.id;
              
                // this.fire('toast',{status:'load'});
                // axios.post('./send_answer/send_answer',data)
                // .then((response)=>{
                //     this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                //         callback:()=>{
                //             this.fire('nylon-change-page',{path:'/examHistory/1'})
                //             // this.stat = false;
                //             // console.log(response.data);
                //         }
                //      });
                    
                // })
                // .catch((error)=>{
                //     console.log('error');
                //     console.log(error);
                // });
            },
            EXAM_POST_ANSWER:function(data){
                axios.post('link',)
                .then((response)=>{
                    console.log('success!!');
                    console.log(response.data);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAM_GET_DATA:function(id){
                axios.get('./exam/exam?exam_room_id='+id)
                .then((response)=>{
                    console.log('success!!');
                    console.log(response.data);
                    store.dispatch({type:'EXAM_GET_DATA',payload:response.data})
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAM_PUT_CHOICE:function(data){
                return axios.put('./exam/exam',data)
            },
            EXAM_COUNTDOWN:function(countDownDate){
                const getTime = ()=>{
                    axios.get('./exam/time')
                    .then((response)=>{
                        this.timeServer = new Date(response.data.date).getTime();
                    })
                    .catch((error)=>{
                        console.log('error');
                    });
                }
                getTime();
                var asyncGetTime = setInterval(()=>{
                    getTime();
                },10000);

                    if(x){
                        clearInterval(x);
                    }
                    var time = this.dataList.time;

                    const transform=(digi)=>{
                        if(digi<10){
                            return "0"+digi
                        }else{
                            return digi
                        }
                    }
                    
                    var x = setInterval(()=>{
                        
                        var distance = new Date(countDownDate).getTime() - this.timeServer;
                        
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                        this.countDown = `${transform(hours)}:${transform(minutes)}:${transform(seconds)}`
                        if (distance < 0) {
                            clearInterval(x);
                            this.countDown = "หมดเวลา";
                            //this.sendAnswer(true);
                        }
                        this.timeServer = this.timeServer+1000;
                    }, 1000);
                    
                
            }
        }
    ]
}