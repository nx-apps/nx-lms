import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    examList:[],
    studentList:[],
    studentListCompleteExam:[],
    examRoomList:[],
    selectexamRoom:{}
}

export function examRoomReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAMROOM_GET_EXAM_LIST':
            return Object.assign({},state,{examList:action.payload});
        case 'EXAMROOM_GET_STUDENT_LIST':
            return Object.assign({},state,{studentList:action.payload});
        case 'EXAMROOM_GET_STUDENT_LIST_COMPLETE_EXAM':
            return Object.assign({},state,{studentListCompleteExam:action.payload});
        case 'EXAMROOM_GET_EXAMROOM':
            return Object.assign({},state,{examRoomList:action.payload});
        case 'EXAMROOM_SELECT_DATA':
            return Object.assign({},state,{selectexamRoom:action.payload});
        case 'EXAMROOM_CLEAR_DATA':
            return Object.assign({},state,{selectexamRoom:{}});
        case 'EXAMROOM_CLEAR_STUDENT_LIST':
            return Object.assign({},state,{studentList:[]});
        default:
            return state
    }

}

export function examRoomAction(store){
    return [commonAction(),
        {
            EXAMROOM_GET_EXAM_LIST:function(id){
                axios.get('./examRoom/examList?user_id='+id)
                .then((response)=>{
                    console.log('*',response.data);
                    store.dispatch({type:'EXAMROOM_GET_EXAM_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
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
                axios.get('./examRoom/learnerTestList?id='+id)
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
                axios.get('./examRoom/examRoom?id='+id)
                .then((response)=>{
                    console.log('success!!');
                    // console.log(response.data);
                    store.dispatch({type:'EXAMROOM_SELECT_DATA',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_INSERT_DATA:function(data){
                this.fire('toast',{status:'load'});
                axios.post('./examRoom/examRoom',data)
                .then((response)=>{
                    this.EXAMROOM_GET_EXAMROOM();
                     this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                        callback:function(){
                        }
                     });
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_UPDATE_DATA:function(data){
                this.fire('toast',{status:'load'});
                axios.put('./examRoom/examRoom',data)
                .then((response)=>{
                    this.EXAMROOM_GET_EXAMROOM();
                    this.fire('toast',{status:'success',text:'แก้ไขสำเร็จ',
                      callback:function(){
                      }
                    });
                })
                .catch((error)=>{
                console.log('error');
                console.log({error});
                });
            },
            EXAMROOM_DELETE_DATA:function(id){
                this.fire('toast',{status:'load'});
                axios.delete('./examRoom/examRoom?id='+id)
                .then((response)=>{
                    this.EXAMROOM_GET_EXAMROOM();
                     this.fire('toast',{status:'success',text:'ลบข้อมูลสำเร็จ',
                        callback:()=>{
                            this.fire('close');
                        }   
                     });
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_CLEAR_DATA:function(){
                store.dispatch({type:'EXAMROOM_CLEAR_DATA'});
            }
        }
    ]
}