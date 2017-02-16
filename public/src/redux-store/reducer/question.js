import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    dataList:[]
}

export function questionReducer(state = initialState,action){

    switch (action.type) {
        case 'QUESTION_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        default:
            return state
    }

}

export function questionAction(store){
    return [commonAction(),
        {
            QUESTION_GET_LIST:function(module){
                this.fire('toast',{status:'load'});
                var user_id = store.getState().auth.user.id;
                axios.get('./question/question',{params:{user_id,module}})
                .then((response)=>{
                    store.dispatch({type:'QUESTION_GET_LIST',payload:response.data});
                    this.fire('toast',{status:'success',text:'โหลดข้อมูลสำเร็จ',
                      callback:function(){
                      }
                     });
                })
                .catch((error)=>{
                    console.log(error);
                });
            },
            QUESTION_INSERT:function(data){
                data.user_id = store.getState().auth.user.id;
                return new Promise((resolve,reject)=>{
                    axios.post('./question/question',data)
                    .then((response)=>{
                        this.QUESTION_GET_LIST(this.moduleSelect);
                        resolve(response);
                    })
                    .catch((error)=>{
                        reject(error);
                    });

                })
                
            },
            QUESTION_UPDATE:function(data){
                data.user_id = store.getState().auth.user.id;
                return new Promise((resolve,reject)=>{
                    axios.put('./question/question',data)
                    .then((response)=>{
                        this.QUESTION_GET_LIST(this.moduleSelect);
                        resolve(response);
                    })
                    .catch((error)=>{
                        reject(error);
                    });

                })
                
            },
            QUESTION_DELETE:function(questionId){
                return new Promise((resolve,reject)=>{
                    axios.delete('./question/question?id='+questionId)
                    .then((response)=>{
                        this.QUESTION_GET_LIST(this.moduleSelect);
                        resolve(response);
                    })
                    .catch((error)=>{
                        reject(error);
                    });

                })
                
            },
            QUESTION_SELECT:function(questionId){
                return new Promise((resolve,reject)=>{
                    axios.get('./question/question_only?id='+questionId)
                    .then((response)=>{
                        // var choice = response.data.choice.map((row,i)=>{
                        //     if(i===response.data.answer){
                        //         return {checked:true,choice:row};
                        //     }else{
                        //         return {checked:false,choice:row};
                        //     }
                        // });
                        // response.data.choice = choice;
                        resolve(response);
                    })
                    .catch((error)=>{
                        reject(error);
                    });
                });
            },
            QUESTION_IMAGE:function(files){
                var data = new FormData();
                data.append('file',files[0]);
                return axios.post('./image/image', data);
            },
            QUESTION_UPLOAD:function(files){
                var data = new FormData();
                data.append('file',files[0]);
                data.append('user_id',store.getState().auth.user.id);
                return axios.post('./question/upload', data);
            }
        }
    ]
}
