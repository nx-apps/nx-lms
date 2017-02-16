import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    dataList:[]
}

export function userManageReducer(state = initialState,action){
    switch (action.type) {
        case 'USER_MANAGE_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'USER_MANAGE_CLEAR_LIST':
            return Object.assign({},state,{dataList:action.payload});
        default:
            return state;
    }
}

export function userManageAction(store){
    return [commonAction(),
        {
            USER_MANAGE_GET_LIST:function(tag){
                this.fire('toast',{status:'load'});
                axios.get('./user/user?tags='+tag)
                .then((response)=>{
                    // console.log(response.data);
                    this.fire('toast',{status:'success',
                      callback:function(){
                      }
                     });
                    store.dispatch({type:'USER_MANAGE_GET_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            USER_MANAGE_CLEAR_LISTL:function(){
                 store.dispatch({type:'USER_MANAGE_GET_LIST',payload:{}});
            }        
        }
    ]
}