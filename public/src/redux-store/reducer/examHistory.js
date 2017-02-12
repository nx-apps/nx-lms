import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    examList:[]
}

export function examHistoryReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAM_HISTORY_EXAM_LIST':
            return Object.assign({},state,{examList:action.payload});
        default:
            return state
    }

}

export function examHistoryAction(store){

    return [commonAction(),
        {
            EXAM_HISTORY_EXAM_LIST:function(){
                var data = [{name:'ข้อสอบ TEST'}];
                store.dispatch({type    :'EXAM_HISTORY_EXAM_LIST',payload:data})
            }
        }
    ]

}