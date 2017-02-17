import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    dataList:[],
    dataSelect:{}
}

export function userManageReducer(state = initialState,action){
    switch (action.type) {
        case 'USER_MANAGE_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'USER_MANAGE_CLEAR_LIST':
            return Object.assign({},state,{dataSelect:action.payload});
        case 'USER_MANAGE_SELECT_LIST':
            return Object.assign({},state,{dataSelect:action.payload});
        default:
            return state;
    }
}

export function userManageAction(store){
    return [commonAction(),
        {
            USER_MANAGE_GET_LIST:function(tag){
                this.newTag = tag;
                this.fire('toast',{status:'load'});
                axios.get('./user/user?tags='+tag)
                .then((response)=>{
                    console.log(response.data);
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
            USER_MANAGE_SELECT_LIST:function(id){
                axios.get('./user/select_user?id='+id)
                .then((response)=>{
                    this.USER_MANAGE_CLEAR_LIST();
                    console.log(response.data);
                    store.dispatch({type:'USER_MANAGE_SELECT_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            USER_MANAGE_INSERT:function(data){
                // this.fire('toast',{status:'load'});
                axios.post('./user/user',data)
                .then((response)=>{
                    // this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                    //   callback:()=>{
                    //       console.log(response.data);
                         
                    //   }
                    //  });
                      this.USER_MANAGE_GET_LIST(this.newTag);
                    
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            USER_MANAGE_UPDATE:function(data){
                // this.fire('toast',{status:'load'});
                axios.put('./user/user',data)
                .then((response)=>{
                    // this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                    //   callback:()=>{
                           
                    //   }
                    //  });
                     this.USER_MANAGE_GET_LIST(this.newTag);
                })
                .catch((error)=>{
                console.log('error');
                console.log(error);
                });
            },
            USER_MANAGE_DELETE:function(id){
                // this.fire('toast',{status:'load'});
                axios.delete('./user/user?id='+id)
                .then((response)=>{
                    // this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                    //   callback:()=>{
                         
                    //   }
                    //  });
                      this.USER_MANAGE_GET_LIST(this.newTag);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            USER_MANAGE_CLEAR_LIST:function(){
                 store.dispatch({type:'USER_MANAGE_CLEAR_LIST',payload:{}});
            }        
        }
    ]
}