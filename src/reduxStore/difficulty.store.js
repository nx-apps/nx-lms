import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    dataList:[]
}

export function difficultyReducer(state = initialState,action){

    switch (action.type) {
        case 'DIFFICULTY_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'DIFFICULTY_CLEAR_LIST':
            return Object.assign({},state,{dataList:[]});
        default:
            return state
    }

}

export function difficultyAction(store){
    return [commonAction(),
        {
            DIFFICULTY_GET_LIST:function(module){
                this.fire('toast',{status:'load'});
                axios.get('./question/report_question?module='+module)
                .then((response)=>{
                    // console.log(JSON.stringify(response.data));
                    this.fire('toast',{status:'success',
                      callback:()=>{
                            store.dispatch({type:'DIFFICULTY_GET_LIST',payload:response.data});
                      }
                     });
                    // console.log('success!!');
                   
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            DIFFICULTY_CLEAR_LIST:function(){
                store.dispatch({type:'DIFFICULTY_CLEAR_LIST'});
            }
        }
    ]
}