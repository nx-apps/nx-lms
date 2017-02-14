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
            EXAM_RESULT_GET_RESULT:function(exam_room_id){
                var user_id = store.getState().auth.user.id;
                console.log(exam_room_id,'...',user_id);
                axios.get('./send_answer/show_answer',{
                params:{
                    exam_room_id: exam_room_id,
                    user_id:user_id
                }
                })
                .then((response)=>{
                    console.log('success!!');
                    console.log(response.data);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
                // axios.get('./send_answer/show_answer',{
                //     params:{
                //         exam_room_id,
                //         user_id
                //     }
                //     })
                // .then(res=>{
                //     console.log(res.data);
                //     store.dispatch({type:'EXAM_RESULT_GET_RESULT',payload:res.data})
                // })
            }
        }
    ]
}