import axios from '../axios'
import {commonAction} from '../config'

const initialState = {}

export function examResultReducer(state = initialState,action){

    switch (action.type) {
        case 'XXXXX':
            return Object.assign({},state,{examList:action.payload});
        default:
            return state
    }

}

export function examResultAction(store){
    return [commonAction(),
        {
            EXAM_RESULT_GET_RESULT:function(exam_room_id,user_id = store.getState().auth.user.id){
                axios.get('/send_answer/show_answer',{params:{exam_room_id,user_id}})
                .then(res=>{
                    console.log(res);
                })
            }
        }
    ]
}