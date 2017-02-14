import axios from '../axios'
import {commonAction} from '../config'

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
                var newData = [data];
                console.log(newData);
                this.fire('toast',{status:'load'});
                axios.post('./send_answer/send_answer',newData)
                .then((response)=>{
                    this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                        callback:()=>{
                            // this.stat = false;
                        }
                     });
                    console.log(response.data);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
        }
    ]
}