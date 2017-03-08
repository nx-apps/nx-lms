import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    examList:[],
    examination_list:[],
    studentList:[],
    studentListCompleteExam:[],
    examRoomList:[],
    selectexamRoom:{}
}

export function examRoomReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAMROOM_GET_EXAM_LIST':
            return Object.assign({},state,{examList:action.payload});
        case 'EXAMROOM_GET_EXIAMINATION_LIST':
            return Object.assign({},state,{examination_list:action.payload});
        case 'EXAMROOM_GET_STUDENT_LIST':
            return Object.assign({},state,{studentList:action.payload});
        case 'EXAMROOM_GET_STUDENT_LIST_COMPLETE_EXAM':
            return Object.assign({},state,{studentListCompleteExam:action.payload});
        case 'EXAMROOM_GET_EXAMROOM':
            return Object.assign({},state,{examRoomList:action.payload});
        case 'EXAMROOM_SELECT_DATA':
            return Object.assign({},state,{selectexamRoom:action.payload});
        case 'EXAMROOM_CLEAR_DATA':
            return Object.assign({},state,{selectexamRoom:{},studentList:[],studentListCompleteExam:[]});
        case 'EXAMROOM_CLEAR_STUDENT_LIST':
            return Object.assign({},state,{studentList:[]});
        case 'EXAMROOM_CLEAR_LIST':
            return Object.assign({},state,{examList:[]});
        default:
            return state
    }

}

export function examRoomAction(store){
    return [commonAction(),
        {
            EXAMROOM_GET_EXAM_LIST:function(tags){
                this.tags2 = tags;
                this.fire('toast',{status:'load'});
                axios.get('./examRoom/examRoom?module='+tags)
                .then((response)=>{
                    console.log('*',response.data);
                    this.fire('toast',{status:'success',
                      callback:()=>{
                          this.fire('close');
                      }
                     });
                    store.dispatch({type:'EXAMROOM_GET_EXAM_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_GET_EXIAMINATION_LIST:function(module){
                axios.get('/examRoom/examRoom_module?module='+module)
                .then((response)=>{
                    console.log('success!!',response.data);
                   store.dispatch({type:'EXAMROOM_GET_EXIAMINATION_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_CLEAR_LIST:function(){
                store.dispatch({type:'EXAMROOM_CLEAR_LIST'});
            },
            EXAMROOM_GET_STUDENT_LIST:function(tag){
                axios.get('./examRoom/userModuleList?module='+tag)
                .then((response)=>{
                    // console.log(response.data)
                    store.dispatch({type:'EXAMROOM_GET_STUDENT_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_CLEAR_STUDENT_LIST:function(){
                store.dispatch({type:'EXAMROOM_CLEAR_STUDENT_LIST'});
            },
            EXAMROOM_GET_STUDENT_LIST_COMPLETE_EXAM:function(id){
                axios.get('./examRoom/student?id='+id)
                .then((response)=>{
                    // console.log(response.data);
                    store.dispatch({type:'EXAMROOM_GET_STUDENT_LIST_COMPLETE_EXAM',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_GET_EXAMROOM:function(){
                var user_id = store.getState().auth.user.id;
                axios.get('./examRoom/examRoomList?user_id='+user_id)
                .then((response)=>{
                    store.dispatch({type:'EXAMROOM_GET_EXAMROOM',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_SELECT_DATA:function(id){
                this.fire('toast',{status:'load'});
                axios.get('./examRoom/examRoom_only?id='+id)
                .then((response)=>{
                    this.fire('toast',{status:'success',
                      callback:()=>{
                        this.fire('open');
                        store.dispatch({type:'EXAMROOM_SELECT_DATA',payload:response.data});
                      }
                     });
                    // console.log('success!!');
                    // console.log(response.data);
                  
                     
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_INSERT_DATA:function(data){
                axios.post('./examRoom/examRoom',data)
                .then((response)=>{
                    this.EXAMROOM_GET_EXAM_LIST(this.tags2);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_UPDATE_DATA:function(data){
                axios.put('./examRoom/examRoom',data)
                .then((response)=>{
                    this.EXAMROOM_GET_EXAM_LIST(this.tags2);
                })
                .catch((error)=>{
                console.log('error');
                console.log({error});
                });
            },
            EXAMROOM_DELETE_DATA:function(id){
                axios.delete('./examRoom/examRoom?id='+id)
                .then((response)=>{
                    this.EXAMROOM_GET_EXAM_LIST(this.tags2);
                })
                .catch((error)=>{
                    this.fire('toast',{status:'connectError',text:error.response.data.error,
                         callback:function(){}
                    })
                });
            },
            EXAMROOM_CLEAR_DATA:function(){
                store.dispatch({type:'EXAMROOM_CLEAR_DATA'});
            },
            EXAMROOM_EJECT:function(examTestId,examRoomId){
                axios.delete('./examRoom/ejectExamTest?id='+examTestId)
                .then((response)=>{
                    console.log(examTestId);
                    this.dispatchAction('EXAMROOM_GET_STUDENT_LIST_COMPLETE_EXAM',examRoomId);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_RETEST:function(examTestId,examRoomId){
                axios.delete('./examRoom/retestExamTest?id='+examTestId)
                .then((response)=>{
                    console.log(examTestId);
                    this.dispatchAction('EXAMROOM_GET_STUDENT_LIST_COMPLETE_EXAM',examRoomId);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            }
        }
    ]
}