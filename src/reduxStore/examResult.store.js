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
            EXAM_RESULT_GET_RESULT:function(exam_room_id,user_id=store.getState().auth.user.id){
                // alert('1234');
                // console.log('user_id',user_id);
                // console.log('exam_room_id',exam_room_id);
                axios.get('./send_answer/show_answer',{
                    params:{exam_room_id,user_id}
                })
                .then((response)=>{
                    console.log('success!!');
                    console.log(JSON.stringify(response.data));
                    store.dispatch({type:'EXAM_RESULT_GET_RESULT',payload:response.data})
                    this.nylonVisible(true);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            }
        }
    ]
}