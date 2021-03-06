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
                // var id = store.getState().auth.user.id;
                axios.get('./exam/examList')
                .then((response)=>{
                    console.log(response.data);
                    store.dispatch({type:'EXAM_HISTORY_EXAM_LIST',payload:response.data})
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAM_HISTORY_EXAM_LIST_SELECT:function(id){
                // console.log(id);
                axios.get('./examHistory/test_exam?id='+id)
                .then((response)=>{
                    // console.log(JSON.stringify(response.data));
                    // console.log(response.data);
                    store.dispatch({type:'EXAM_HISTORY_EXAM_LIST_SELECT',payload:response.data})
                    this.nylonVisible(true);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAM_HISTORY_EXAM_LIST_COMPLETE:function(){
                // var id = store.getState().auth.user.id;
                // console.log('1234');
                axios.get('./exam/historyList')
                .then((response)=>{
                    console.log(response.data);
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