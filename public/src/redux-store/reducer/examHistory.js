import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    examList:[],
    examListComplete:[],
    examSelect:{}
}

export function examHistoryReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAM_HISTORY_EXAM_LIST':
            return Object.assign({},state,{examList:action.payload});
        case 'EXAM_HISTORY_EXAM_LIST_SELECT':
            return Object.assign({},state,{examSelect:action.payload});
        case 'EXAM_HISTORY_EXAM_LIST_COMPLETE':
            return Object.assign({},state,{examListComplete:action.payload});
      
        default:
            return state
    }

}

export function examHistoryAction(store){

    return [commonAction(),
        {
            EXAM_HISTORY_EXAM_LIST:function(){
                var id = store.getState().auth.user.id;
                axios.get('./examHistory/examList?user_id='+id)
                .then((response)=>{
                    store.dispatch({type:'EXAM_HISTORY_EXAM_LIST',payload:response.data})
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAM_HISTORY_EXAM_LIST_SELECT:function(id){
                console.log(id);
                axios.get('./test_exam/test_exam?id='+id)
                .then((response)=>{
                    console.log(response.data);
                    store.dispatch({type:'EXAM_HISTORY_EXAM_LIST_SELECT',payload:response.data})
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAM_HISTORY_EXAM_LIST_COMPLETE:function(){
                var id = store.getState().auth.user.id;
                axios.get('./examHistory/historyList?user_id='+id)
                .then((response)=>{
                    store.dispatch({type:'EXAM_HISTORY_EXAM_LIST_COMPLETE',payload:response.data})
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            }   
        }
    ]

}