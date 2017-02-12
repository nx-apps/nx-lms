import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    examList:[],
    studentList:[]
}

export function examRoomReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAMROOM_GET_EXAM_LIST':
            return Object.assign({},state,{examList:action.payload});
        case 'EXAMROOM_GET_STUDENT_LIST':
            return Object.assign({},state,{studentList:action.payload});
        case 'EXAMROOM_GET_CONFIRM_STUDNET':
            return Object.assign({},state,{confirmStudentList:action.payload});
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
                    store.dispatch({type:'EXAMROOM_GET_EXAM_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_GET_STUDENT_LIST:function(){
                axios.get('./examRoom/learnerList')
                .then((response)=>{
                    store.dispatch({type:'EXAMROOM_GET_STUDENT_LIST',payload:response.data});
                    store.dispatch({type:'EXAMROOM_GET_CONFIRM_STUDNET',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_GET_CONFIRM_STUDNET:function(){
                this.EXAMROOM_GET_STUDENT_LIST();
            }
        }
    ]
}