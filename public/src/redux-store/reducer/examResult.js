import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    result:{}
}

export function examResultReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAM_RESULT_GET_RESULT':
            return Object.assign({},state,{result:action.payload});
        default:
            return state
    }
}

export function examResultAction(store){
    return [commonAction(),
        {
            EXAM_RESULT_GET_RESULT:function(examination_id,user_id=store.getState().auth.user.id){
                axios.get('./send_answer/show_answer',{
                    params:{examination_id,user_id}
                })
                .then((response)=>{
                    console.log('success!!');
                    store.dispatch({type:'EXAM_RESULT_GET_RESULT',payload:response.data})
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            }
        }
    ]
}